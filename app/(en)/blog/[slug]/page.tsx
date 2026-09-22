import { BlogPostPage, blogStaticParams, postMetadata } from "@/components/pages/blog";

export const dynamicParams = false;

export function generateStaticParams() {
  return blogStaticParams("en");
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  return postMetadata("en", slug);
}

export default async function Page({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  return <BlogPostPage lang="en" slug={slug} />;
}
