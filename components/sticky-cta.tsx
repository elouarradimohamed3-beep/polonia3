"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Lang } from "@/lib/i18n";
import { sectionHref } from "@/lib/routes";

const copy = { pl: { from: "od", per: "miesięcznie", trial: "Test", plans: "Plany" }, en: { from: "from", per: "a month", trial: "Trial", plans: "Plans" } } as const;

/** Mobile-only bar. Appears after the hero, hides while plans, the trial form or the footer are on screen. */
export function StickyCta({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const [pastHero, setPastHero] = useState(false);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const visible = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target);
          else visible.delete(e.target);
        }
        setBlocked(visible.size > 0);
      },
      { threshold: 0.1 },
    );
    document.querySelectorAll("#plans, #trial, footer").forEach((el) => io.observe(el));
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  const show = pastHero && !blocked;
  return (
    <div
      id="sticky-cta"
      data-visible={show}
      inert={!show}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-10px_30px_rgba(20,24,31,0.12)] backdrop-blur transition-transform duration-300 md:hidden ${show ? "translate-y-0" : "translate-y-full"}`}
    >
      <div className="mx-auto flex max-w-md items-center justify-between gap-3">
        <p className="text-sm leading-tight text-ink-soft">{t.from} <strong className="text-lg text-header">€15</strong><span className="block text-xs">{t.per}</span></p>
        <div className="flex gap-2">
          <Link href={sectionHref(lang, "trial")} className="btn btn-ghost !px-4 !py-2.5">{t.trial}</Link>
          <Link href={sectionHref(lang, "plans")} className="btn btn-primary !px-5 !py-2.5">{t.plans}</Link>
        </div>
      </div>
    </div>
  );
}
