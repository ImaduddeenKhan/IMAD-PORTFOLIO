import DomainPage from "@/components/portfolio/DomainPage";
import domain from "@/lib/domains/truck-permit-providers";
import { buildDomainMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const metadata = buildDomainMetadata(domain);

export default function Page() {
  return <DomainPage domain={domain} />;
}
