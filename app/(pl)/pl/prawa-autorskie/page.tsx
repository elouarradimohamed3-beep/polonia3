import { LegalPage, legalMetadata } from "@/components/pages/legal";

export const metadata = legalMetadata("pl", "copyright");

export default function Page() {
  return <LegalPage lang="pl" docKey="copyright" />;
}
