"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";

export default function SettingsClient({ initialPublished, email }) {
  const [published, setPublished] = useState(initialPublished);
  const [pending, startTransition] = useTransition();

  async function patch(payload, successMsg) {
    const res = await fetch("/api/me/portfolio", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    if (!res.ok || !json.ok) {
      toast.error(json?.error?.message || "Failed");
      return false;
    }
    if (successMsg) toast.success(successMsg);
    return true;
  }

  function togglePublished() {
    const next = !published;
    setPublished(next);
    startTransition(async () => {
      const okRes = await patch({ published: next }, next ? "Portfolio is now public!" : "Portfolio is now private");
      if (!okRes) setPublished(!next);
    });
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="font-display text-2xl font-semibold">Settings</h1>

      <section className="card p-5 space-y-4">
        <h2 className="font-display font-semibold">Visibility</h2>
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="font-medium">{published ? "Published" : "Private"}</div>
            <div className="text-sm text-muted">
              {published
                ? "Anyone with the link can view your portfolio."
                : "Only you can see your portfolio."}
            </div>
          </div>
          <button
            onClick={togglePublished}
            disabled={pending}
            className={`relative h-7 w-12 rounded-full transition-colors ${published ? "bg-primary" : "bg-border"}`}
            aria-pressed={published}
          >
            <span className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-all ${published ? "left-6" : "left-1"}`} />
          </button>
        </div>
      </section>

      <section className="card p-5 space-y-4">
        <h2 className="font-display font-semibold">Admin</h2>
        <div className="text-sm">
          <span className="text-muted">Email:</span> <span className="font-mono">{email}</span>
        </div>
        <div className="space-y-3">
          <div>
            <label className="label">Public URL</label>
            <div className="input font-mono text-sm">{typeof window !== "undefined" ? `${window.location.origin}/` : "http://localhost:3000/"}</div>
          </div>
          <p className="text-xs text-muted">
            This project is now a single-owner portfolio. Edit content from the admin tabs, then publish or unpublish the site from here.
          </p>
        </div>
      </section>
    </div>
  );
}
