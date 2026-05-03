import Link from "next/link";

export default function AuthLayout({ children }) {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-10">
      <div className="bg-orbs" aria-hidden="true" />
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block font-display text-2xl font-bold tracking-tight">
            <span className="text-primary">Imad</span> Portfolio
          </Link>
        </div>
        <div className="card p-6 sm:p-8 backdrop-blur">{children}</div>
      </div>
    </div>
  );
}
