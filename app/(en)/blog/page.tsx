import { BlogIndexPage, blogIndexMetadata } from "@/components/pages/blog";

export const metadata = blogIndexMetadata("en");

export default function Page() {
  return <BlogIndexPage lang="en" />;
}
