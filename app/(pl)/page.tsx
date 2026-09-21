import { HomePage, homeMetadata } from "@/components/pages/home";

export const metadata = homeMetadata("pl");

export default function Page() {
  return <HomePage lang="pl" />;
}
