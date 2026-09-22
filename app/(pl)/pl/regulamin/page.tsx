import { LegalPage, legalMetadata } from "@/components/pages/legal";

export const metadata = legalMetadata("pl", "terms");

export default function Page() {
  return <LegalPage lang="pl" docKey="terms" />;
}
