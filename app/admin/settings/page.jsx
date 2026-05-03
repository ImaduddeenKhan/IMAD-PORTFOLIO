import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getAdminPortfolio } from "@/lib/site-data";
import SettingsClient from "@/app/dashboard/settings/SettingsClient";

export default async function AdminSettingsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login?callbackUrl=/admin/settings");

  const portfolio = await getAdminPortfolio();
  return (
    <SettingsClient
      initialPublished={Boolean(portfolio.published)}
      email={session.user.email}
    />
  );
}