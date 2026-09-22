import { LegalPage, legalMetadata } from "@/components/pages/legal";

export const metadata = legalMetadata("pl", "privacy");

export default function Page() {
  return <LegalPage lang="pl" docKey="privacy" />;
}
