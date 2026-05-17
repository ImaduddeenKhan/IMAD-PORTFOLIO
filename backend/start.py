"""Start script for the backend server."""
import os
import sys

# Ensure we're running from the backend directory
os.chdir(os.path.dirname(os.path.abspath(__file__)))

import uvicorn
from dotenv import load_dotenv

load_dotenv()

if __name__ == "__main__":
    host = os.getenv("HOST", "0.0.0.0")
    port = int(os.getenv("PORT", 8000))
    print(f"Starting Portfolio API on http://{host}:{port}")
    print(f"API docs at http://localhost:{port}/docs")
    uvicorn.run("main:app", host=host, port=port, reload=True)
