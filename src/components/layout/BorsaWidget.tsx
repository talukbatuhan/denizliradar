"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import type { BorsaData } from "@/lib/borsa";
import {
  formatBistValue,
  formatChangePercent,
  formatRate,
  formatUsdPrice,
} from "@/lib/borsa";

const REFRESH_MS = 2 * 60 * 1000;

function MarketDivider() {
  return (
    <span className="mx-3 hidden text-[11px] text-white/20 sm:inline" aria-hidden="true">
      |
    </span>
  );
}

function InlineQuote({
  label,
  value,
  change,
}: {
  label: string;
  value: string;
  change?: number;
}) {
  const isUp = change !== undefined && change >= 0;

  return (
    <span className="inline-flex shrink-0 items-baseline gap-2">
      <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/38">
        {label}
      </span>
      <span className="text-[13px] font-semibold tabular-nums leading-none text-white/95">
        {value}
      </span>
      {change !== undefined && (
        <span
          className={`text-[12px] font-medium tabular-nums leading-none ${
            isUp ? "text-emerald-400/75" : "text-rose-400/75"
          }`}
        >
          {formatChangePercent(change)}
        </span>
      )}
    </span>
  );
}

export function BorsaWidget() {
  const [borsa, setBorsa] = useState<BorsaData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBorsa() {
      try {
        const response = await fetch("/api/borsa");
        if (response.ok) {
          setBorsa(await response.json());
        }
      } finally {
        setLoading(false);
      }
    }

    loadBorsa();
    const interval = setInterval(loadBorsa, REFRESH_MS);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex h-8 items-center justify-center gap-2 text-[12px] tracking-[0.14em] text-white/45">
        <Loader2 className="size-3.5 animate-spin" />
        <span className="uppercase">Piyasalar</span>
      </div>
    );
  }

  if (!borsa) {
    return (
      <Link
        href="/canli-borsa"
        className="flex h-8 items-center justify-center text-[12px] uppercase tracking-[0.14em] text-white/45 transition-colors hover:text-white/70"
      >
        Canlı Piyasalar
      </Link>
    );
  }

  return (
    <Link
      href="/canli-borsa"
      className="flex h-8 items-center justify-center overflow-x-auto whitespace-nowrap transition-opacity hover:opacity-90 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <InlineQuote
        label="BIST 100"
        value={formatBistValue(borsa.bist100.value)}
        change={borsa.bist100.changePercent}
      />
      <MarketDivider />
      <InlineQuote label="USD" value={formatRate(borsa.usdTry)} />
      <MarketDivider />
      <InlineQuote label="EUR" value={formatRate(borsa.eurTry)} />
      <MarketDivider />
      <InlineQuote
        label="BTC"
        value={formatUsdPrice(borsa.btc.value)}
        change={borsa.btc.changePercent}
      />
      <MarketDivider />
      <InlineQuote
        label="ETH"
        value={formatUsdPrice(borsa.eth.value)}
        change={borsa.eth.changePercent}
      />
    </Link>
  );
}
