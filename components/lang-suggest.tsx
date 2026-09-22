"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useState, useSyncExternalStore } from "react";

const KEY = "lang-suggest-dismissed";
const subscribe = () => () => {};

function wantsPolish() {
  try { return navigator.language?.toLowerCase().startsWith("pl") && !localStorage.getItem(KEY); } catch { return false; }
}

/** Floating suggestion (never a redirect) for visitors whose browser is set to Polish. */
export function LangSuggest({ href }: { href: string }) {
  const suggested = useSyncExternalStore(subscribe, wantsPolish, () => false);
  const [dismissed, setDismissed] = useState(false);
  if (!suggested || dismissed) return null;
  return (
    <div role="region" aria-label="Język strony" lang="pl" className="fixed bottom-24 left-4 z-50 max-w-[18rem] rounded-xl border border-border bg-white p-4 text-sm text-header shadow-2xl md:bottom-5">
      <button type="button" aria-label="Zamknij" className="absolute right-2 top-2 rounded p-1 text-ink-soft hover:bg-background" onClick={() => { try { localStorage.setItem(KEY, "1"); } catch { /* ignore */ } setDismissed(true); }}><X size={16} aria-hidden="true" /></button>
      <p className="pr-6 font-semibold">Ta strona jest dostępna po polsku.</p>
      <Link href={href} hrefLang="pl" className="btn btn-teal mt-3 !px-4 !py-2 text-sm">Przejdź na polską wersję</Link>
    </div>
  );
}
