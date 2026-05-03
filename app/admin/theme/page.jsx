import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getAdminPortfolio } from "@/lib/site-data";
import ThemeStudioClient from "@/app/dashboard/theme/ThemeStudioClient";

export default async function AdminThemePage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login?callbackUrl=/admin/theme");

  const portfolio = await getAdminPortfolio();
  return <ThemeStudioClient initialTheme={portfolio.theme || {}} />;
}