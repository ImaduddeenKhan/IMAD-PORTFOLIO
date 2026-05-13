"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import ListEditor from "@/components/dashboard/ListEditor";
import { SOCIAL_PLATFORMS } from "@/components/icons";

const TABS = [
  { id: "profile", label: "Profile" },
  { id: "hero", label: "Hero" },
  { id: "socials", label: "Socials" },
  { id: "projects", label: "Projects" },
  { id: "building", label: "Building" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "achievements", label: "Achievements" },
  { id: "certifications", label: "Certs" },
  { id: "languages", label: "Languages" },
  { id: "hobbies", label: "Hobbies" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
  { id: "seo", label: "SEO" },
];

const PROJECT_FIELDS = [
  { key: "title", label: "Title", required: true, placeholder: "My amazing project" },
  { key: "description", label: "Short description", type: "textarea", rows: 2, placeholder: "One-paragraph pitch (shows on card)" },
  { key: "longDescription", label: "Long description", type: "textarea", rows: 6, placeholder: "Detailed write-up shown on the project page" },
  { key: "tags", label: "Tags", array: true, placeholder: "react, ai, python" },
  { key: "status", label: "Status", type: "select", options: [
    { value: "active", label: "Active" }, { value: "wip", label: "Work in progress" }, { value: "archived", label: "Archived" },
  ] },
  { key: "githubUrl", label: "GitHub URL" },
  { key: "liveDemoUrl", label: "Live demo URL" },
  { key: "youtubeUrl", label: "YouTube video URL" },
  { key: "thumbnail", label: "Thumbnail image", type: "image", uploadKind: "thumbnail" },
  { key: "screenshots", label: "Screenshots", type: "images" },
  { key: "featured", label: "Featured", type: "checkbox" },
];

const BUILDING_FIELDS = [
  { key: "name", label: "Startup name", required: true },
  { key: "tagline", label: "Tagline", placeholder: "One-line pitch" },
  { key: "status", label: "Status", type: "select", options: [
    { value: "idea", label: "Idea" }, { value: "building", label: "Building" }, { value: "beta", label: "Beta" }, { value: "live", label: "Live" },
  ] },
  { key: "url", label: "URL" },
  { key: "videoUrl", label: "YouTube video URL" },
  { key: "description", label: "Description", type: "textarea", rows: 3 },
  { key: "logo", label: "Logo", type: "image" },
];

const EXP_FIELDS = [
  { key: "role", label: "Role", required: true },
  { key: "company", label: "Company", required: true },
  { key: "companyUrl", label: "Company URL" },
  { key: "date", label: "Date range", placeholder: "Jan 2024 – Present" },
  { key: "location", label: "Location" },
  { key: "points", label: "Bullet points", array: true, placeholder: "One bullet per line, comma-separated" },
  { key: "tags", label: "Tags", array: true },
];

const EDU_FIELDS = [
  { key: "degree", label: "Degree", required: true },
  { key: "institution", label: "Institution", required: true },
  { key: "date", label: "Date range" },
  { key: "location", label: "Location" },
  { key: "description", label: "Description", type: "textarea", rows: 3 },
];

const SKILL_FIELDS = [
  { key: "category", label: "Category", required: true, placeholder: "Languages / Frameworks / etc." },
  { key: "items", label: "Skills", array: true, placeholder: "Python, React, …" },
];

const CERT_FIELDS = [
  { key: "name", label: "Name", required: true },
  { key: "issuer", label: "Issuer" },
  { key: "date", label: "Date" },
  { key: "url", label: "URL" },
];

const ACH_FIELDS = [
  { key: "title", label: "Title", required: true },
  { key: "description", label: "Description", type: "textarea", rows: 3 },
  { key: "date", label: "Date" },
];

const LANG_FIELDS = [
  { key: "name", label: "Language", required: true },
  { key: "level", label: "Level", placeholder: "Native / Fluent / Conversational" },
];

const HOBBY_FIELDS = [
  { key: "name", label: "Hobby", required: true },
];

const SOCIAL_FIELDS = [
  { key: "platform", label: "Platform", type: "select", options: SOCIAL_PLATFORMS.map((p) => ({ value: p, label: p })) },
  { key: "url", label: "URL", required: true },
];

export default function EditorClient({ initial }) {
  const [tab, setTab] = useState("profile");
  const [data, setData] = useState(initial);
  const [dirty, setDirty] = useState(false);
  const [pending, startTransition] = useTransition();

  function update(patch) {
    setData((d) => ({ ...d, ...patch }));
    setDirty(true);
  }
  function updateNested(key, patch) {
    setData((d) => ({ ...d, [key]: { ...(d[key] || {}), ...patch } }));
    setDirty(true);
  }
  function setArray(key, items) {
    setData((d) => ({ ...d, [key]: items }));
    setDirty(true);
  }

  async function save() {
    startTransition(async () => {
      const payload = {
        personalInfo: data.personalInfo,
        hero: data.hero,
        socials: data.socials,
        skills: data.skills,
        experience: data.experience,
        education: data.education,
        projects: data.projects,
        building: data.building,
        certifications: data.certifications,
        achievements: data.achievements,
        languages: data.languages,
        hobbies: data.hobbies,
        resumeUrl: data.resumeUrl,
        contactEmail: data.contactEmail,
        contactMessage: data.contactMessage,
        seo: data.seo,
      };
      const res = await fetch("/api/me/portfolio", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        toast.error(json?.error?.message || "Save failed");
        return;
      }
      toast.success("Saved!");
      setDirty(false);
    });
  }

  return (
    <div>
      <div className="flex items-start justify-between gap-3 mb-6 flex-wrap">
        <div>
          <h1 className="font-display text-2xl font-semibold">Edit your portfolio</h1>
          <p className="text-sm text-muted">Changes save when you hit the button below.</p>
        </div>
        <button onClick={save} disabled={pending || !dirty} className="btn-primary disabled:opacity-50">
          {pending ? "Saving…" : dirty ? "Save changes" : "All saved"}
        </button>
      </div>

      <div className="card p-1 mb-6 flex overflow-x-auto gap-1 sticky top-16 md:top-0 z-10 backdrop-blur bg-surface/80">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-3 py-1.5 rounded-md text-sm whitespace-nowrap ${
              tab === t.id ? "bg-primary text-[rgb(var(--primary-fg))]" : "text-fg/70 hover:bg-bg"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {tab === "profile" && (
          <Card title="Personal info">
            <Field label="Full name *" value={data.personalInfo?.fullName} onChange={(v) => updateNested("personalInfo", { fullName: v })} />
            <Field label="Role / title" value={data.personalInfo?.role} onChange={(v) => updateNested("personalInfo", { role: v })} />
            <Field label="Tagline" value={data.personalInfo?.tagline} onChange={(v) => updateNested("personalInfo", { tagline: v })} />
            <Field label="Location" value={data.personalInfo?.location} onChange={(v) => updateNested("personalInfo", { location: v })} />
            <Field label="Public email" type="email" value={data.personalInfo?.email} onChange={(v) => updateNested("personalInfo", { email: v })} />
            <Field label="Phone" value={data.personalInfo?.phone} onChange={(v) => updateNested("personalInfo", { phone: v })} />
            <ImageField label="Avatar" value={data.personalInfo?.avatar} onChange={(v) => updateNested("personalInfo", { avatar: v })} kind="avatar" />
          </Card>
        )}

        {tab === "hero" && (
          <Card title="Hero section" description="The first thing visitors see. Add a YouTube intro video to stand out.">
            <Field label="Greeting" value={data.hero?.greeting} onChange={(v) => updateNested("hero", { greeting: v })} placeholder="Hey, I'm …" />
            <Field label="Headline" value={data.hero?.headline} onChange={(v) => updateNested("hero", { headline: v })} placeholder="I build …" />
            <TextField label="Description" rows={4} value={data.hero?.description} onChange={(v) => updateNested("hero", { description: v })} />
            <Field label="Intro YouTube video URL" value={data.hero?.introVideoUrl} onChange={(v) => updateNested("hero", { introVideoUrl: v })} placeholder="https://youtube.com/watch?v=…" />
            <div className="grid sm:grid-cols-2 gap-3">
              <Field label="CTA button label" value={data.hero?.ctaLabel} onChange={(v) => updateNested("hero", { ctaLabel: v })} />
              <Field label="CTA URL" value={data.hero?.ctaUrl} onChange={(v) => updateNested("hero", { ctaUrl: v })} />
            </div>
          </Card>
        )}

        {tab === "socials" && (
          <Card title="Social links">
            <ListEditor
              items={data.socials || []}
              onChange={(v) => setArray("socials", v)}
              fields={SOCIAL_FIELDS}
              addLabel="Add social link"
            />
          </Card>
        )}

        {tab === "projects" && (
          <Card title="Projects" description="Each project gets its own detail page with screenshots and links.">
            <ListEditor
              items={data.projects || []}
              onChange={(v) => setArray("projects", v)}
              fields={PROJECT_FIELDS}
              addLabel="Add project"
            />
          </Card>
        )}

        {tab === "building" && (
          <Card title="What I'm building" description="One or two focused startups / side projects.">
            <ListEditor items={data.building || []} onChange={(v) => setArray("building", v)} fields={BUILDING_FIELDS} addLabel="Add startup" />
          </Card>
        )}

        {tab === "experience" && (
          <Card title="Work experience">
            <ListEditor items={data.experience || []} onChange={(v) => setArray("experience", v)} fields={EXP_FIELDS} addLabel="Add experience" />
          </Card>
        )}

        {tab === "education" && (
          <Card title="Education">
            <ListEditor items={data.education || []} onChange={(v) => setArray("education", v)} fields={EDU_FIELDS} addLabel="Add education" />
          </Card>
        )}

        {tab === "skills" && (
          <Card title="Skills" description="Group skills by category.">
            <ListEditor items={data.skills || []} onChange={(v) => setArray("skills", v)} fields={SKILL_FIELDS} addLabel="Add category" />
          </Card>
        )}

        {tab === "achievements" && (
          <Card title="Achievements">
            <ListEditor items={data.achievements || []} onChange={(v) => setArray("achievements", v)} fields={ACH_FIELDS} addLabel="Add achievement" />
          </Card>
        )}

        {tab === "certifications" && (
          <Card title="Certifications">
            <ListEditor items={data.certifications || []} onChange={(v) => setArray("certifications", v)} fields={CERT_FIELDS} addLabel="Add certification" />
          </Card>
        )}

        {tab === "languages" && (
          <Card title="Languages">
            <ListEditor items={data.languages || []} onChange={(v) => setArray("languages", v)} fields={LANG_FIELDS} addLabel="Add language" />
          </Card>
        )}

        {tab === "hobbies" && (
          <Card title="Hobbies">
            <ListEditor items={data.hobbies || []} onChange={(v) => setArray("hobbies", v)} fields={HOBBY_FIELDS} addLabel="Add hobby" />
          </Card>
        )}

        {tab === "resume" && (
          <Card title="Resume" description="Paste a Google Drive or public resume URL, or upload a PDF.">
            <Field label="Resume URL" value={data.resumeUrl} onChange={(v) => update({ resumeUrl: v })} placeholder="https://drive.google.com/..." />
            <ImageField label="Resume PDF" value={data.resumeUrl} onChange={(v) => update({ resumeUrl: v })} kind="resume" accept="application/pdf" />
          </Card>
        )}

        {tab === "contact" && (
          <Card title="Contact section">
            <Field label="Public contact email" type="email" value={data.contactEmail} onChange={(v) => update({ contactEmail: v })} />
            <TextField label="Message above the contact form" rows={3} value={data.contactMessage} onChange={(v) => update({ contactMessage: v })} />
          </Card>
        )}

        {tab === "seo" && (
          <Card title="SEO & sharing">
            <Field label="Page title" value={data.seo?.title} onChange={(v) => updateNested("seo", { title: v })} />
            <TextField label="Meta description" rows={3} value={data.seo?.description} onChange={(v) => updateNested("seo", { description: v })} />
            <ImageField label="Open Graph image" value={data.seo?.ogImage} onChange={(v) => updateNested("seo", { ogImage: v })} kind="og" />
          </Card>
        )}
      </div>

      {/* Sticky save bar on mobile */}
      <div className="md:hidden fixed bottom-16 left-0 right-0 px-4 z-20">
        {dirty && (
          <button onClick={save} disabled={pending} className="btn-primary w-full shadow-lg">
            {pending ? "Saving…" : "Save changes"}
          </button>
        )}
      </div>
    </div>
  );
}

function Card({ title, description, children }) {
  return (
    <div className="card p-5 sm:p-6 space-y-4">
      <div>
        <h2 className="font-display text-lg font-semibold">{title}</h2>
        {description && <p className="text-sm text-muted mt-1">{description}</p>}
      </div>
      {children}
    </div>
  );
}

function Field({ label, value, onChange, type = "text", placeholder }) {
  return (
    <div>
      <label className="label">{label}</label>
      <input className="input" type={type} value={value || ""} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function TextField({ label, value, onChange, rows = 3 }) {
  return (
    <div>
      <label className="label">{label}</label>
      <textarea className="input resize-y" rows={rows} value={value || ""} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function ImageField({ label, value, onChange, kind, accept = "image/*" }) {
  const [uploading, setUploading] = useState(false);
  async function upload(file) {
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("kind", kind || "file");
    try {
      const res = await fetch("/api/me/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        toast.error(data?.error?.message || "Upload failed");
        return;
      }
      onChange(data.data.url);
      toast.success("Uploaded");
    } finally {
      setUploading(false);
    }
  }
  return (
    <div>
      <label className="label">{label}</label>
      <input
        type="file"
        accept={accept}
        onChange={(e) => upload(e.target.files?.[0])}
        className="text-xs file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border file:border-border file:bg-surface file:text-fg file:cursor-pointer"
      />
      {uploading && <span className="ml-2 text-xs text-muted">Uploading…</span>}
      {value && (
        <div className="mt-2 flex items-center gap-2 text-xs">
          <a href={value} target="_blank" rel="noopener noreferrer" className="text-primary truncate max-w-xs hover:underline">{value}</a>
          <button type="button" onClick={() => onChange("")} className="text-muted hover:text-red-400">Remove</button>
        </div>
      )}
    </div>
  );
}
