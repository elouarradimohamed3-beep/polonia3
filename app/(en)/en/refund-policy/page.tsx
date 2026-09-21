import { LegalPage, legalMetadata } from "@/components/pages/legal";

export const metadata = legalMetadata("en", "refunds");

export default function Page() {
  return <LegalPage lang="en" docKey="refunds" />;
}
