"use client";

import { useEffect, useState } from "react";

const PHONE = "919125197678";

export default function WhatsAppFab({ domainLabel = "your portfolio" }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 600);
    return () => clearTimeout(t);
  }, []);

  const text = encodeURIComponent(
    `Hi Imad, I came from your ${domainLabel} page on your portfolio. I'd like to discuss AI automation for my business.`
  );
  const href = `https://wa.me/${PHONE}?text=${text}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`WhatsApp Imad about ${domainLabel}`}
      className={`fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-[60] inline-flex items-center gap-2.5 rounded-full px-4 py-3 shadow-[0_14px_40px_rgba(37,211,102,0.45)] transition-all duration-500 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
      }`}
      style={{ background: "#25D366", color: "#0b3d22" }}
    >
      <span
        className="inline-flex h-9 w-9 items-center justify-center rounded-full"
        style={{ background: "rgba(255,255,255,0.95)" }}
      >
        <svg viewBox="0 0 32 32" className="h-5 w-5" aria-hidden="true">
          <path
            fill="#25D366"
            d="M19.11 17.21c-.27-.14-1.62-.8-1.87-.89-.25-.09-.43-.14-.62.14-.18.27-.71.89-.87 1.07-.16.18-.32.2-.59.07-.27-.14-1.16-.43-2.21-1.37-.82-.73-1.37-1.63-1.53-1.91-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.46.09-.18.05-.34-.02-.48-.07-.14-.62-1.5-.86-2.05-.23-.55-.46-.48-.62-.49l-.53-.01a1.02 1.02 0 0 0-.74.34c-.25.27-.96.94-.96 2.3 0 1.36.99 2.67 1.13 2.85.14.18 1.94 2.97 4.71 4.16.66.28 1.17.45 1.57.58.66.21 1.26.18 1.74.11.53-.08 1.62-.66 1.85-1.3.23-.64.23-1.18.16-1.3-.07-.11-.25-.18-.52-.32Zm-4.95 6.76h-.01a9.7 9.7 0 0 1-4.94-1.35l-.36-.21-3.67.96.98-3.58-.23-.37a9.69 9.69 0 0 1-1.49-5.18C4.45 8.86 8.85 4.46 14.17 4.46a9.6 9.6 0 0 1 6.84 2.84 9.6 9.6 0 0 1 2.83 6.85c0 5.32-4.4 9.72-9.68 9.72Zm8.25-17.97A11.55 11.55 0 0 0 14.17 2.5C7.76 2.5 2.49 7.77 2.49 14.18c0 2.05.54 4.05 1.55 5.81L2.4 26.5l6.66-1.74a11.66 11.66 0 0 0 5.11 1.3h.01c6.41 0 11.68-5.27 11.68-11.68a11.62 11.62 0 0 0-3.45-8.38Z"
          />
        </svg>
      </span>
      <span className="text-sm font-semibold tracking-tight">Talk on WhatsApp</span>
    </a>
  );
}
