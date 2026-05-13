import DomainPage from "@/components/portfolio/DomainPage";
import domain from "@/lib/domains/agriculture-agribusiness";

export const dynamic = "force-dynamic";
export const metadata = {
  title: `${domain.label} · AI Automation by Imad Khan`,
  description: domain.subheadline,
};

export default function Page() {
  return <DomainPage domain={domain} />;
}
