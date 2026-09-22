import { LegalPage, legalMetadata } from "@/components/pages/legal";

export const metadata = legalMetadata("en", "terms");

export default function Page() {
  return <LegalPage lang="en" docKey="terms" />;
}
