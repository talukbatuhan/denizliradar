export type MarketQuote = {
  value: number;
  changePercent: number;
};

export type BorsaData = {
  bist100: MarketQuote;
  usdTry: number;
  eurTry: number;
  btc: MarketQuote;
  eth: MarketQuote;
  updatedAt: string;
};

function formatPercent(current: number, previous: number): number {
  if (!previous) return 0;
  return ((current - previous) / previous) * 100;
}

async function getYahooQuote(symbol: string): Promise<MarketQuote> {
  const response = await fetch(
    `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=2d`,
    {
      headers: { "User-Agent": "DenizliRadar/1.0" },
      next: { revalidate: 120 },
    },
  );

  if (!response.ok) {
    throw new Error(`${symbol} alınamadı`);
  }

  const data = await response.json();
  const meta = data.chart?.result?.[0]?.meta;

  if (!meta?.regularMarketPrice) {
    throw new Error(`${symbol} verisi bulunamadı`);
  }

  const value = meta.regularMarketPrice as number;
  const previous = (meta.chartPreviousClose ?? meta.previousClose ?? value) as number;

  return {
    value,
    changePercent: formatPercent(value, previous),
  };
}

async function getExchangeRates() {
  const [usdResponse, eurResponse] = await Promise.all([
    fetch("https://open.er-api.com/v6/latest/USD", {
      next: { revalidate: 300 },
    }),
    fetch("https://open.er-api.com/v6/latest/EUR", {
      next: { revalidate: 300 },
    }),
  ]);

  if (!usdResponse.ok || !eurResponse.ok) {
    throw new Error("Döviz kurları alınamadı");
  }

  const usdData = await usdResponse.json();
  const eurData = await eurResponse.json();

  return {
    usdTry: usdData.rates.TRY as number,
    eurTry: eurData.rates.TRY as number,
  };
}

export async function getBorsaData(): Promise<BorsaData> {
  const [bist100, btc, eth, rates] = await Promise.all([
    getYahooQuote("XU100.IS"),
    getYahooQuote("BTC-USD"),
    getYahooQuote("ETH-USD"),
    getExchangeRates(),
  ]);

  return {
    bist100,
    usdTry: rates.usdTry,
    eurTry: rates.eurTry,
    btc,
    eth,
    updatedAt: new Date().toISOString(),
  };
}

export function formatBistValue(value: number): string {
  return new Intl.NumberFormat("tr-TR", {
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatRate(value: number): string {
  return new Intl.NumberFormat("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatUsdPrice(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: value >= 1000 ? 0 : 2,
  }).format(value);
}

export function formatChangePercent(value: number): string {
  const formatted = new Intl.NumberFormat("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    signDisplay: "exceptZero",
  }).format(value);

  return `%${formatted}`;
}
