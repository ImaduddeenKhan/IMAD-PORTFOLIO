"""
Portfolio Backend - FastAPI server
Handles:
  - Serving project images (static files)
  - Image upload for projects (Supabase or local)
  - Contact form submission
  - Admin authentication (JWT)
  - CRUD for all portfolio content (stored as JSON)
"""

import os
import uuid
import json
import datetime
from pathlib import Path
from typing import Optional

import jwt
from dotenv import load_dotenv
from fastapi import FastAPI, UploadFile, File, Form, HTTPException, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
from PIL import Image

load_dotenv()

# -- Config ----------------------------------------------------------
UPLOAD_DIR = Path(os.getenv("UPLOAD_DIR", "uploads"))
MAX_FILE_SIZE_MB = int(os.getenv("MAX_FILE_SIZE_MB", 5))
ALLOWED_EXTENSIONS = os.getenv(
    "ALLOWED_EXTENSIONS", ".jpg,.jpeg,.png,.webp,.gif,.svg"
).split(",")
CORS_ORIGINS = os.getenv(
    "CORS_ORIGINS", "http://localhost:5173"
).split(",")

# Admin
ADMIN_USER = os.getenv("ADMIN_USER", "admin")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "changeme123")
JWT_SECRET = os.getenv("JWT_SECRET", "change-this-secret")
JWT_ALGORITHM = "HS256"

# Supabase
SUPABASE_URL = os.getenv("SUPABASE_URL", "")
SUPABASE_KEY = os.getenv("SUPABASE_KEY", "")
SUPABASE_BUCKET = os.getenv("SUPABASE_BUCKET", "portfolio-images")

# Data file
DATA_FILE = Path(__file__).parent / "portfolio_data.json"

# Create upload directories
PROJECTS_DIR = UPLOAD_DIR / "projects"
PROJECTS_DIR.mkdir(parents=True, exist_ok=True)


# -- Supabase Client ------------------------------------------------
supabase_client = None
if SUPABASE_URL and SUPABASE_KEY and SUPABASE_URL.startswith("https://"):
    try:
        from supabase import create_client
        supabase_client = create_client(SUPABASE_URL, SUPABASE_KEY)
        print(f"[OK] Supabase connected: {SUPABASE_URL}")
    except Exception as e:
        print(f"[WARN] Supabase init failed: {e}. Using local storage.")
else:
    print("[INFO] Supabase not configured. Using local file storage.")


# -- Data Persistence -----------------------------------------------
def load_data() -> dict:
    """Load portfolio data from JSON file."""
    if DATA_FILE.exists():
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    return {
        "projects": [],
        "blogs": [],
        "experience": [],
        "about": {},
        "contact": {},
    }


def save_data(data: dict):
    """Save portfolio data to JSON file."""
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


# -- JWT Auth -------------------------------------------------------
def create_token(username: str) -> str:
    payload = {
        "sub": username,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24),
        "iat": datetime.datetime.utcnow(),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


def verify_token(request: Request) -> str:
    """Dependency: Extract and verify JWT from Authorization header."""
    auth = request.headers.get("Authorization", "")
    if not auth.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Not authenticated")
    token = auth.split(" ", 1)[1]
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload["sub"]
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")


# -- App ------------------------------------------------------------
app = FastAPI(
    title="Portfolio API",
    description="Backend for Imad's portfolio -- content management + media",
    version="2.0.0",
)

# CORS -- allow the Vite frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve uploaded images as static files  ->  /uploads/projects/filename.webp
app.mount("/uploads", StaticFiles(directory=str(UPLOAD_DIR)), name="uploads")


# -- Helpers --------------------------------------------------------
def _validate_image(file: UploadFile) -> None:
    """Validate file extension and size."""
    ext = Path(file.filename).suffix.lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=f"File type '{ext}' not allowed. Allowed: {ALLOWED_EXTENSIONS}",
        )


def _optimize_image(filepath: Path, max_width: int = 1200) -> None:
    """Resize large images to keep the portfolio fast. Skip SVGs."""
    if filepath.suffix.lower() == ".svg":
        return
    try:
        with Image.open(filepath) as img:
            if img.width > max_width:
                ratio = max_width / img.width
                new_size = (max_width, int(img.height * ratio))
                img = img.resize(new_size, Image.LANCZOS)
            # Save as WebP for smaller size (keep original too)
            webp_path = filepath.with_suffix(".webp")
            img.save(webp_path, "WEBP", quality=85)
    except Exception:
        pass  # If optimization fails, the original file still works


async def _upload_to_supabase(file_bytes: bytes, filename: str, content_type: str) -> Optional[str]:
    """Upload file to Supabase storage bucket. Returns public URL or None."""
    if not supabase_client:
        return None
    try:
        path = f"images/{filename}"
        supabase_client.storage.from_(SUPABASE_BUCKET).upload(
            path, file_bytes, {"content-type": content_type}
        )
        res = supabase_client.storage.from_(SUPABASE_BUCKET).get_public_url(path)
        return res
    except Exception as e:
        print(f"Supabase upload error: {e}")
        return None


# -- Public Routes --------------------------------------------------
@app.get("/api/health")
async def health_check():
    return {
        "status": "ok",
        "message": "Portfolio API is running",
        "supabase": bool(supabase_client),
    }


@app.post("/api/projects/{project_id}/image")
async def upload_project_image(
    project_id: str,
    file: UploadFile = File(...),
):
    """Upload an image for a specific project."""
    _validate_image(file)

    # Read file and check size
    contents = await file.read()
    size_mb = len(contents) / (1024 * 1024)
    if size_mb > MAX_FILE_SIZE_MB:
        raise HTTPException(
            status_code=400,
            detail=f"File too large ({size_mb:.1f}MB). Max: {MAX_FILE_SIZE_MB}MB",
        )

    # Try Supabase first
    if supabase_client:
        ext = Path(file.filename).suffix.lower()
        sb_url = await _upload_to_supabase(
            contents, f"{project_id}{ext}", file.content_type
        )
        if sb_url:
            return {
                "message": "Image uploaded to Supabase",
                "project_id": project_id,
                "image_url": sb_url,
            }

    # Fallback to local storage
    ext = Path(file.filename).suffix.lower()
    filename = f"{project_id}{ext}"
    filepath = PROJECTS_DIR / filename

    with open(filepath, "wb") as f:
        f.write(contents)

    _optimize_image(filepath)

    webp_exists = filepath.with_suffix(".webp").exists()
    serve_name = f"{project_id}.webp" if webp_exists else filename

    return {
        "message": "Image uploaded successfully",
        "project_id": project_id,
        "image_url": f"/uploads/projects/{serve_name}",
        "original_url": f"/uploads/projects/{filename}",
    }


@app.get("/api/projects/images")
async def list_project_images():
    """List all uploaded project images."""
    images = {}
    if PROJECTS_DIR.exists():
        for f in PROJECTS_DIR.iterdir():
            if f.is_file() and f.suffix.lower() in ALLOWED_EXTENSIONS + [".webp"]:
                project_id = f.stem
                if project_id not in images or f.suffix.lower() == ".webp":
                    images[project_id] = f"/uploads/projects/{f.name}"
    return {"images": images}


@app.delete("/api/projects/{project_id}/image")
async def delete_project_image(project_id: str):
    """Delete a project's image."""
    deleted = False
    for ext in ALLOWED_EXTENSIONS + [".webp"]:
        filepath = PROJECTS_DIR / f"{project_id}{ext}"
        if filepath.exists():
            filepath.unlink()
            deleted = True
    if not deleted:
        raise HTTPException(status_code=404, detail="Image not found")
    return {"message": "Image deleted", "project_id": project_id}


@app.post("/api/contact")
async def submit_contact(
    name: str = Form(...),
    email: str = Form(...),
    message: str = Form(...),
):
    """Handle contact form submissions."""
    if not name.strip() or not email.strip() or not message.strip():
        raise HTTPException(status_code=400, detail="All fields are required")

    print(f"\n{'='*50}")
    print(f"[NEW] NEW CONTACT MESSAGE")
    print(f"Name:    {name}")
    print(f"Email:   {email}")
    print(f"Message: {message}")
    print(f"{'='*50}\n")

    return {
        "message": "Thank you! Your message has been received.",
        "status": "success",
    }


# -- Content API (public, read-only) -------------------------------
@app.get("/api/content")
async def get_content():
    """Get all portfolio content as JSON (for dynamic frontend loading)."""
    return load_data()


# -- Admin Routes ---------------------------------------------------
@app.post("/api/admin/login")
async def admin_login(request: Request):
    body = await request.json()
    username = body.get("username", "")
    password = body.get("password", "")

    if username == ADMIN_USER and password == ADMIN_PASSWORD:
        token = create_token(username)
        return {"token": token, "message": "Login successful"}

    raise HTTPException(status_code=401, detail="Invalid credentials")


@app.get("/api/admin/data")
async def admin_get_data(user: str = Depends(verify_token)):
    """Get all portfolio data for admin editing."""
    return load_data()


@app.post("/api/admin/upload-image")
async def admin_upload_image(
    file: UploadFile = File(...),
    project_id: str = Form("temp"),
    user: str = Depends(verify_token),
):
    """Upload an image (tries Supabase first, falls back to local)."""
    _validate_image(file)
    contents = await file.read()
    size_mb = len(contents) / (1024 * 1024)
    if size_mb > MAX_FILE_SIZE_MB:
        raise HTTPException(status_code=400, detail=f"File too large ({size_mb:.1f}MB)")

    ext = Path(file.filename).suffix.lower()
    unique_name = f"{project_id}_{uuid.uuid4().hex[:8]}{ext}"

    # Try Supabase
    if supabase_client:
        sb_url = await _upload_to_supabase(contents, unique_name, file.content_type)
        if sb_url:
            return {"url": sb_url}

    # Local fallback
    filepath = PROJECTS_DIR / unique_name
    with open(filepath, "wb") as f:
        f.write(contents)
    _optimize_image(filepath)

    webp_path = filepath.with_suffix(".webp")
    if webp_path.exists():
        return {"url": f"/uploads/projects/{webp_path.name}"}
    return {"url": f"/uploads/projects/{unique_name}"}


# --- CRUD: Projects -----------------------------------------------
@app.post("/api/admin/projects")
async def admin_save_project(request: Request, user: str = Depends(verify_token)):
    body = await request.json()
    item = body.get("item", {})
    data = load_data()

    projects = data.get("projects", [])
    # Update existing or add new
    idx = next((i for i, p in enumerate(projects) if p.get("id") == item.get("id")), None)
    if idx is not None:
        projects[idx] = item
    else:
        projects.append(item)

    data["projects"] = projects
    save_data(data)
    return {"projects": projects}


@app.delete("/api/admin/projects/{project_id}")
async def admin_delete_project(project_id: str, user: str = Depends(verify_token)):
    data = load_data()
    data["projects"] = [p for p in data.get("projects", []) if p.get("id") != project_id]
    save_data(data)
    return {"projects": data["projects"]}


# --- CRUD: Blogs --------------------------------------------------
@app.post("/api/admin/blogs")
async def admin_save_blog(request: Request, user: str = Depends(verify_token)):
    body = await request.json()
    item = body.get("item", {})
    data = load_data()

    blogs = data.get("blogs", [])
    idx = next((i for i, b in enumerate(blogs) if b.get("slug") == item.get("slug")), None)
    if idx is not None:
        blogs[idx] = item
    else:
        blogs.append(item)

    data["blogs"] = blogs
    save_data(data)
    return {"blogs": blogs}


@app.delete("/api/admin/blogs/{slug}")
async def admin_delete_blog(slug: str, user: str = Depends(verify_token)):
    data = load_data()
    data["blogs"] = [b for b in data.get("blogs", []) if b.get("slug") != slug]
    save_data(data)
    return {"blogs": data["blogs"]}


# --- CRUD: Experience ---------------------------------------------
@app.post("/api/admin/experience")
async def admin_save_experience(request: Request, user: str = Depends(verify_token)):
    body = await request.json()
    item = body.get("item", {})
    index = body.get("index")
    data = load_data()

    experience = data.get("experience", [])
    if index is not None and 0 <= index < len(experience):
        experience[index] = item
    else:
        experience.append(item)

    data["experience"] = experience
    save_data(data)
    return {"experience": experience}


@app.delete("/api/admin/experience/{index}")
async def admin_delete_experience(index: int, user: str = Depends(verify_token)):
    data = load_data()
    exp = data.get("experience", [])
    if 0 <= index < len(exp):
        exp.pop(index)
    data["experience"] = exp
    save_data(data)
    return {"experience": exp}


# --- CRUD: About & Contact ----------------------------------------
@app.post("/api/admin/about")
async def admin_save_about(request: Request, user: str = Depends(verify_token)):
    body = await request.json()
    item = body.get("item", {})
    data = load_data()
    data["about"] = item
    save_data(data)
    return {"about": item}


@app.post("/api/admin/contact")
async def admin_save_contact(request: Request, user: str = Depends(verify_token)):
    body = await request.json()
    item = body.get("item", {})
    data = load_data()
    data["contact"] = item
    save_data(data)
    return {"contact": item}


# -- Run ------------------------------------------------------------
if __name__ == "__main__":
    import uvicorn

    host = os.getenv("HOST", "0.0.0.0")
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host=host, port=port, reload=True)
