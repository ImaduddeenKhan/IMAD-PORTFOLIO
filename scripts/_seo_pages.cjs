const fs = require("fs");
const slugs = [
  "logistics-freight","healthcare","retail-ecommerce","manufacturing","construction-engineering",
  "insurance","banking-capital-markets","accounting-finance-ops","legal","real-estate",
  "education-coaching","hr-recruitment","telecom-isp","government-public-sector",
  "travel-tourism-hospitality","restaurants-food-services","agriculture-agribusiness",
  "renewable-energy","customer-support-bpo","professional-services-agencies",
  "mortgage-lenders-brokers","truck-permit-providers",
];
for (const s of slugs) {
  const p = `app/${s}/page.jsx`;
  if (!fs.existsSync(p)) { console.log("MISSING", p); continue; }
  const c =
`import DomainPage from "@/components/portfolio/DomainPage";
import domain from "@/lib/domains/${s}";
import { buildDomainMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const metadata = buildDomainMetadata(domain);

export default function Page() {
  return <DomainPage domain={domain} />;
}
`;
  fs.writeFileSync(p, c);
  console.log("Updated", p);
}
