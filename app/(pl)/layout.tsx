import "../globals.css";
import { RootShell } from "@/components/root-shell";
import { rootMetadata, rootViewport } from "@/lib/root-metadata";

export const metadata = rootMetadata("pl");
export const viewport = rootViewport;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="pl">{children}</RootShell>;
}
