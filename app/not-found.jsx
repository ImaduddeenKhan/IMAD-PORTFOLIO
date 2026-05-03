import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <div className="bg-orbs" />
      <h1 className="font-display text-7xl font-bold text-primary">404</h1>
      <p className="mt-3 text-lg text-muted max-w-md">
        We couldn&apos;t find that page. The portfolio may be unpublished,
        or the URL may be wrong.
      </p>
      <div className="mt-6 flex gap-3 flex-wrap justify-center">
        <Link href="/" className="btn-primary">Back home</Link>
        <Link href="/admin" className="btn-outline">Open admin</Link>
      </div>
    </main>
  );
}
