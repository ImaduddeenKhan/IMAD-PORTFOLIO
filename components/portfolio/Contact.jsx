"use client";

import { useState } from "react";
import { toast } from "sonner";
import { SectionHeader } from "./SectionHeader";

export default function Contact({ contactEmail, contactMessage }) {
  const [submitting, setSubmitting] = useState(false);
  if (!contactEmail && !contactMessage) return null;

  async function onSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setSubmitting(true);
    try {
      const res = await fetch(`/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          message: fd.get("message"),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        toast.error(data?.error?.message || "Could not send message");
        return;
      }
      toast.success("Message sent! I'll get back to you soon.");
      e.target.reset();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="section-shell">
      <SectionHeader id="contact" title="Get in touch" subtitle={contactMessage} />
      <div className="grid gap-5 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)]">
        <div className="card motion-card p-6 sm:p-7 animate-fade-up">
          <div className="eyebrow mb-3">Direct contact</div>
          {contactEmail && (
            <a href={`mailto:${contactEmail}`} className="font-display text-2xl tracking-[-0.04em] break-all hover:text-primary transition-colors">
              {contactEmail}
            </a>
          )}
          <p className="mt-4 text-sm text-fg/70 leading-relaxed">
            For collaborations, AI product consulting, or project walkthrough requests, use the form or email directly.
          </p>
        </div>
        <form onSubmit={onSubmit} className="card motion-card p-6 sm:p-7 grid gap-4 animate-fade-up" style={{ "--enter-delay": "110ms" }}>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Your name</label>
              <input name="name" required maxLength={120} className="input" />
            </div>
            <div>
              <label className="label">Your email</label>
              <input name="email" type="email" required maxLength={254} className="input" />
            </div>
          </div>
          <div>
            <label className="label">Message</label>
            <textarea name="message" required maxLength={4000} rows={6} className="input resize-y" />
          </div>
          <div>
            <button disabled={submitting} className="btn-primary">
              {submitting ? "Sending…" : "Send message"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
