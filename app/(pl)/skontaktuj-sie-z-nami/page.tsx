import { ContactPage, contactMetadata } from "@/components/pages/contact";

export const metadata = contactMetadata("pl");

export default function Page() {
  return <ContactPage lang="pl" />;
}
