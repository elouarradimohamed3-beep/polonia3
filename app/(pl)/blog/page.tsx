import { BlogIndexPage, blogIndexMetadata } from "@/components/pages/blog";

export const metadata = blogIndexMetadata("pl");

export default function Page() {
  return <BlogIndexPage lang="pl" />;
}
