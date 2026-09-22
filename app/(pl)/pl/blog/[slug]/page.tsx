import { BlogPostPage, blogStaticParams, postMetadata } from "@/components/pages/blog";

export const dynamicParams = false;

export function generateStaticParams() {
  return blogStaticParams("pl");
}

export async function generateMetadata({ params }: PageProps<"/pl/blog/[slug]">) {
  const { slug } = await params;
  return postMetadata("pl", slug);
}

export default async function Page({ params }: PageProps<"/pl/blog/[slug]">) {
  const { slug } = await params;
  return <BlogPostPage lang="pl" slug={slug} />;
}
