import { redirect } from "next/navigation";
import Link from "next/link";
import { auth, signOut } from "@/lib/auth";
import {
  LayoutDashboard, Palette, Settings, ExternalLink, LogOut,
} from "lucide-react";

const SITE = process.env.NEXT_PUBLIC_SITE_NAME || "Imad Portfolio";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login?callbackUrl=/admin");

  return (
    <div className="min-h-screen flex">
      <aside className="hidden md:flex md:flex-col md:w-64 border-r border-border bg-surface/40 sticky top-0 h-screen">
        <div className="p-5 border-b border-border">
          <Link href="/admin" className="font-display text-lg font-bold">
            <span className="text-primary">{SITE}</span>
          </Link>
          <div className="text-xs text-muted mt-1 truncate">{session.user.email}</div>
        </div>
        <nav className="flex-1 p-3 space-y-1 text-sm">
          <NavLink href="/admin" icon={LayoutDashboard}>Editor</NavLink>
          <NavLink href="/admin/theme" icon={Palette}>Theme studio</NavLink>
          <NavLink href="/admin/settings" icon={Settings}>Settings</NavLink>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-fg/75 hover:bg-surface hover:text-fg transition-colors"
          >
            <ExternalLink className="h-4 w-4" /> View portfolio
          </a>
        </nav>
        <form action={async () => { "use server"; await signOut({ redirectTo: "/" }); }} className="p-3 border-t border-border">
          <button type="submit" className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-fg/75 hover:bg-surface text-sm">
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </form>
      </aside>

      <div className="flex-1 min-w-0">
        <header className="md:hidden sticky top-0 z-30 bg-bg/90 backdrop-blur border-b border-border px-4 py-3 flex items-center justify-between">
          <Link href="/admin" className="font-display font-bold">
            <span className="text-primary">{SITE}</span>
          </Link>
          <a href="/" target="_blank" rel="noopener noreferrer" className="text-xs text-muted hover:text-fg flex items-center gap-1">
            <ExternalLink className="h-3.5 w-3.5" /> View site
          </a>
        </header>

        <main className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">{children}</main>

        <nav className="md:hidden sticky bottom-0 z-30 bg-bg/95 backdrop-blur border-t border-border grid grid-cols-3 text-xs">
          <MobileTab href="/admin" icon={LayoutDashboard} label="Editor" />
          <MobileTab href="/admin/theme" icon={Palette} label="Theme" />
          <MobileTab href="/admin/settings" icon={Settings} label="Settings" />
        </nav>
      </div>
    </div>
  );
}

function NavLink({ href, icon: Icon, children }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-fg/75 hover:bg-surface hover:text-fg transition-colors"
    >
      <Icon className="h-4 w-4" /> {children}
    </Link>
  );
}

function MobileTab({ href, icon: Icon, label }) {
  return (
    <Link href={href} className="flex flex-col items-center gap-1 py-3 text-muted hover:text-fg">
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </Link>
  );
}