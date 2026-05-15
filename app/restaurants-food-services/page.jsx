import DomainPage from "@/components/portfolio/DomainPage";
import domain from "@/lib/domains/restaurants-food-services";
import { buildDomainMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const metadata = buildDomainMetadata(domain);

export default function Page() {
  return <DomainPage domain={domain} />;
}
