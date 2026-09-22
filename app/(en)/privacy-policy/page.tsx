import { LegalPage, legalMetadata } from "@/components/pages/legal";

export const metadata = legalMetadata("en", "privacy");

export default function Page() {
  return <LegalPage lang="en" docKey="privacy" />;
}
