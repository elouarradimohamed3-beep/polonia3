import { LegalPage, legalMetadata } from "@/components/pages/legal";

export const metadata = legalMetadata("en", "copyright");

export default function Page() {
  return <LegalPage lang="en" docKey="copyright" />;
}
