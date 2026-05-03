import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getAdminPortfolio } from "@/lib/site-data";
import EditorClient from "@/app/dashboard/EditorClient";

export default async function AdminPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login?callbackUrl=/admin");

  const portfolio = await getAdminPortfolio();
  return <EditorClient initial={portfolio} />;
}