"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error("[app] error boundary caught:", error);
  }, [error]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="font-display text-5xl font-bold text-primary">Something went wrong</h1>
      <p className="mt-3 text-muted max-w-md">
        An unexpected error occurred. We&apos;ve logged it. You can try again, or head home.
      </p>
      <div className="mt-6 flex gap-3 flex-wrap justify-center">
        <button onClick={reset} className="btn-primary">Try again</button>
        <Link href="/" className="btn-outline">Go home</Link>
      </div>
    </main>
  );
}
