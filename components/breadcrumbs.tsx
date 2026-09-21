import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbLd } from "@/lib/seo";

export function Breadcrumbs({
  trail,
  dark = false,
}: {
  trail: { name: string; path: string }[];
  dark?: boolean;
}) {
  const full = [{ name: "Home", path: "/" }, ...trail];
  return (
    <>
      <nav
        aria-label="Ścieżka nawigacji"
        className={dark ? "border-b border-white/10 bg-white/[0.03]" : "border-b border-border bg-muted"}
      >
        <ol className="mx-auto flex max-w-6xl flex-wrap items-center gap-1.5 px-4 py-2.5 text-sm">
          {full.map((item, i) => {
            const last = i === full.length - 1;
            return (
              <li key={item.path} className="flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className={`font-semibold ${dark ? "text-white" : ""}`}>
                    {item.name}
                  </span>
                ) : (
                  <>
                    <Link href={item.path} className={`${dark ? "text-blue-300" : "text-brand"} hover:underline`}>
                      {item.name}
                    </Link>
                    <span aria-hidden="true" className="opacity-40">
                      /
                    </span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbLd(full)} />
    </>
  );
}
