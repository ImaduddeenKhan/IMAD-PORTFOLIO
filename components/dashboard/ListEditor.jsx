"use client";

import { useState } from "react";
import { toast } from "sonner";
import { shortId } from "@/lib/utils";

/** Generic in-memory list editor for arrays of structured items. */
export default function ListEditor({ label, items, onChange, fields, addLabel = "Add item", emptyLabel }) {
  function add() {
    const newItem = { id: shortId() };
    fields.forEach((f) => { newItem[f.key] = f.array ? [] : f.default ?? ""; });
    onChange([...(items || []), newItem]);
  }
  function remove(idx) {
    if (!confirm("Delete this item?")) return;
    const next = [...items];
    next.splice(idx, 1);
    onChange(next);
  }
  function move(idx, dir) {
    const next = [...items];
    const swap = idx + dir;
    if (swap < 0 || swap >= next.length) return;
    [next[idx], next[swap]] = [next[swap], next[idx]];
    onChange(next);
  }
  function update(idx, key, value) {
    const next = [...items];
    next[idx] = { ...next[idx], [key]: value };
    onChange(next);
  }

  return (
    <div className="space-y-3">
      {(items || []).length === 0 && (
        <div className="text-sm text-muted italic">{emptyLabel || "Nothing here yet."}</div>
      )}
      {(items || []).map((item, idx) => (
        <div key={item.id || idx} className="card p-4 space-y-3">
          <div className="flex items-center justify-between text-xs text-muted">
            <span>#{idx + 1}</span>
            <div className="flex gap-1">
              <button type="button" onClick={() => move(idx, -1)} className="px-2 py-0.5 hover:text-fg" aria-label="Move up">↑</button>
              <button type="button" onClick={() => move(idx, 1)} className="px-2 py-0.5 hover:text-fg" aria-label="Move down">↓</button>
              <button type="button" onClick={() => remove(idx)} className="px-2 py-0.5 hover:text-red-400" aria-label="Delete">✕</button>
            </div>
          </div>
          {fields.map((f) => (
            <FieldInput
              key={f.key}
              field={f}
              value={item[f.key]}
              onChange={(v) => update(idx, f.key, v)}
            />
          ))}
        </div>
      ))}
      <button type="button" onClick={add} className="btn-outline w-full text-sm">
        + {addLabel}
      </button>
    </div>
  );
}

function FieldInput({ field, value, onChange }) {
  if (field.array) {
    return (
      <div>
        <label className="label">{field.label}</label>
        <input
          className="input"
          placeholder={field.placeholder || "Comma-separated"}
          value={Array.isArray(value) ? value.join(", ") : ""}
          onChange={(e) => onChange(e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
        />
      </div>
    );
  }
  if (field.type === "textarea") {
    return (
      <div>
        <label className="label">{field.label}</label>
        <textarea
          className="input resize-y"
          rows={field.rows || 3}
          placeholder={field.placeholder}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    );
  }
  if (field.type === "select") {
    return (
      <div>
        <label className="label">{field.label}</label>
        <select className="input" value={value || ""} onChange={(e) => onChange(e.target.value)}>
          {field.options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>
    );
  }
  if (field.type === "checkbox") {
    return (
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)} />
        {field.label}
      </label>
    );
  }
  if (field.type === "image" || field.type === "file") {
    return (
      <FileUploadField field={field} value={value} onChange={onChange} />
    );
  }
  if (field.type === "images") {
    return <MultiImageField field={field} value={value || []} onChange={onChange} />;
  }
  return (
    <div>
      <label className="label">{field.label}{field.required && " *"}</label>
      <input
        className="input"
        type={field.type || "text"}
        placeholder={field.placeholder}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function FileUploadField({ field, value, onChange }) {
  const [uploading, setUploading] = useState(false);
  async function upload(file) {
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("kind", field.uploadKind || "image");
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
      <label className="label">{field.label}</label>
      <div className="flex items-center gap-3">
        <input
          type="file"
          accept={field.accept || "image/*"}
          onChange={(e) => upload(e.target.files?.[0])}
          className="text-xs file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border file:border-border file:bg-surface file:text-fg file:cursor-pointer"
        />
        {uploading && <span className="text-xs text-muted">Uploading…</span>}
      </div>
      {value && (
        <div className="mt-2 flex items-center gap-2 text-xs">
          <a href={value} target="_blank" rel="noopener noreferrer" className="text-primary truncate max-w-xs hover:underline">
            {value}
          </a>
          <button type="button" onClick={() => onChange("")} className="text-muted hover:text-red-400">Remove</button>
        </div>
      )}
    </div>
  );
}

function MultiImageField({ field, value, onChange }) {
  const [uploading, setUploading] = useState(false);
  async function upload(files) {
    if (!files?.length) return;
    setUploading(true);
    const next = [...value];
    for (const file of files) {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("kind", "screenshot");
      try {
        const res = await fetch("/api/me/upload", { method: "POST", body: fd });
        const data = await res.json();
        if (res.ok && data.ok) next.push(data.data.url);
        else toast.error(data?.error?.message || "Upload failed");
      } catch {
        toast.error("Upload failed");
      }
    }
    onChange(next);
    setUploading(false);
  }
  function removeAt(i) {
    const next = [...value];
    next.splice(i, 1);
    onChange(next);
  }
  return (
    <div>
      <label className="label">{field.label}</label>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => upload(e.target.files)}
        className="text-xs file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border file:border-border file:bg-surface file:text-fg file:cursor-pointer"
      />
      {uploading && <span className="ml-2 text-xs text-muted">Uploading…</span>}
      {value.length > 0 && (
        <div className="mt-3 grid grid-cols-3 gap-2">
          {value.map((src, i) => (
            <div key={i} className="relative group aspect-video rounded-md overflow-hidden border border-border bg-bg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => removeAt(i)}
                className="absolute top-1 right-1 h-6 w-6 rounded-full bg-black/70 text-white text-xs opacity-0 group-hover:opacity-100"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
