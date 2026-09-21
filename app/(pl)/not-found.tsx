import type { Metadata } from "next";
import { NotFoundView } from "@/components/not-found-view";

export const metadata: Metadata = { title: "Nie znaleziono strony", robots: { index: false, follow: true } };

export default function NotFound() {
  return <NotFoundView lang="pl" />;
}
