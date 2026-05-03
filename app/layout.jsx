import "./globals.css";
import { Toaster } from "sonner";
import SessionWrapper from "@/components/SessionWrapper";
import { getPublicPortfolio } from "@/lib/site-data";
import { googleFontsHref, resolveTheme, themeStyleString } from "@/lib/themes";

const SITE = process.env.NEXT_PUBLIC_SITE_NAME || "Imad Portfolio";
export const dynamic = "force-dynamic";

export const metadata = {
  title: { default: `${SITE} — AI Engineer`, template: `%s · ${SITE}` },
  description:
    "Imaduddeen Khan's personal portfolio. AI engineer building production-ready AI agents, RAG systems, and full-stack products.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
};

export default async function RootLayout({ children }) {
  const portfolio = await getPublicPortfolio().catch(() => null);
  const theme = resolveTheme(portfolio?.theme || {});
  const css = themeStyleString(theme.vars, { light: theme.lightVars, dark: theme.darkVars });

  return (
    <html lang="en" suppressHydrationWarning data-color-mode={theme.mode}>
      <body className="min-h-screen antialiased">
        <style dangerouslySetInnerHTML={{ __html: css }} />
        <link rel="stylesheet" href={googleFontsHref(portfolio?.theme || {})} />
        <div className="bg-orbs" aria-hidden="true" />
        <SessionWrapper>{children}</SessionWrapper>
        <Toaster richColors position="top-right" theme={theme.mode === "dark" ? "dark" : "light"} />
      </body>
    </html>
  );
}
