"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useState, useSyncExternalStore } from "react";

const KEY = "lang-suggest-dismissed";
const subscribe = () => () => {};

function wantsEnglish() {
  try {
    const l = navigator.language?.toLowerCase() ?? "";
    return !l.startsWith("pl") && l.startsWith("en") && !localStorage.getItem(KEY);
  } catch {
    return false; // storage blocked: stay hidden
  }
}

/**
 * Suggests the English version to visitors whose browser is set to English.
 * A floating card, so it never pushes the page down; a suggestion, not a redirect.
 */
export function LangSuggest({ href }: { href: string }) {
  const suggested = useSyncExternalStore(subscribe, wantsEnglish, () => false);
  const [dismissed, setDismissed] = useState(false);
  if (!suggested || dismissed) return null;
  return (
    <div role="region" aria-label="Language" lang="en" className="fixed bottom-24 left-4 z-50 max-w-[18rem] rounded-xl border border-border bg-white p-4 text-sm text-header shadow-2xl md:bottom-5">
      <button type="button" aria-label="Close" className="absolute right-2 top-2 rounded p-1 text-ink-soft hover:bg-muted" onClick={() => { try { localStorage.setItem(KEY, "1"); } catch { /* ignore */ } setDismissed(true); }}>
        <X size={16} aria-hidden="true" />
      </button>
      <p className="pr-6 font-semibold">This site is also available in English.</p>
      <Link href={href} hrefLang="en" className="btn btn-primary mt-3 !px-4 !py-2 text-sm">Switch to English</Link>
    </div>
  );
}
