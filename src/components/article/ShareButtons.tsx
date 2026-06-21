"use client";

import { useState } from "react";
import { Check, Link2 } from "lucide-react";
import { FacebookIcon, XIcon } from "@/components/icons/SocialIcons";

type ShareButtonsProps = {
  title: string;
  url: string;
};

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <aside
      aria-label="Paylaş"
      className="flex gap-2 lg:sticky lg:top-28 lg:flex-col"
    >
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook'ta paylaş"
        className="inline-flex size-10 items-center justify-center border border-radar-border bg-background text-radar-navy transition-colors hover:border-radar-navy/20 hover:bg-radar-surface"
      >
        <FacebookIcon className="size-4" />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="X'te paylaş"
        className="inline-flex size-10 items-center justify-center border border-radar-border bg-background text-radar-navy transition-colors hover:border-radar-navy/20 hover:bg-radar-surface"
      >
        <XIcon className="size-4" />
      </a>
      <button
        type="button"
        onClick={copyLink}
        aria-label={copied ? "Link kopyalandı" : "Linki kopyala"}
        className="inline-flex size-10 items-center justify-center border border-radar-border bg-background text-radar-navy transition-colors hover:border-radar-navy/20 hover:bg-radar-surface"
      >
        {copied ? <Check className="size-4" /> : <Link2 className="size-4" />}
      </button>
    </aside>
  );
}
