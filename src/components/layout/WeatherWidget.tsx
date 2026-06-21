"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Cloud,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSun,
  Loader2,
  Snowflake,
  Sun,
} from "lucide-react";
import type { WeatherData } from "@/lib/weather";

const REFRESH_MS = 5 * 60 * 1000;

function WeatherIcon({ code, className }: { code: number; className?: string }) {
  if (code === 0) return <Sun className={className} />;
  if (code <= 3) return <CloudSun className={className} />;
  if (code === 45 || code === 48) return <CloudFog className={className} />;
  if (code >= 51 && code <= 67) return <CloudRain className={className} />;
  if (code >= 71 && code <= 77) return <Snowflake className={className} />;
  if (code >= 95) return <CloudLightning className={className} />;
  if (code >= 80) return <CloudRain className={className} />;
  return <Cloud className={className} />;
}

export function WeatherWidget({ compact = false }: { compact?: boolean }) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWeather() {
      try {
        const response = await fetch("/api/weather");
        if (response.ok) {
          setWeather(await response.json());
        }
      } finally {
        setLoading(false);
      }
    }

    loadWeather();
    const interval = setInterval(loadWeather, REFRESH_MS);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <span
        className={`font-nav flex items-center gap-1.5 font-bold uppercase tracking-[0.1em] text-white/70 ${
          compact ? "text-xs" : "text-[13px] sm:text-sm lg:text-[15px]"
        }`}
      >
        <Loader2 className="size-4 animate-spin" />
        {!compact && "Yükleniyor"}
      </span>
    );
  }

  if (!weather) {
    return (
      <Link
        href="/hava-durumu"
        className={`font-nav font-bold uppercase tracking-[0.1em] text-white/70 hover:text-white ${
          compact ? "text-xs" : "text-[13px] sm:text-sm lg:text-[15px]"
        }`}
      >
        Hava Durumu
      </Link>
    );
  }

  return (
    <Link
      href="/hava-durumu"
      title={weather.description}
      className={`font-nav flex items-center gap-1.5 font-bold uppercase tracking-[0.1em] text-white transition-colors hover:text-white/85 ${
        compact ? "text-xs" : "text-[13px] sm:text-sm lg:text-[15px]"
      }`}
    >
      <WeatherIcon code={weather.weatherCode} className="size-4 shrink-0" />
      <span>{weather.temperature}°C</span>
      {!compact && (
        <>
          <span className="text-white/65">Denizli</span>
          <span className="hidden text-white/50 xl:inline">· {weather.description}</span>
        </>
      )}
    </Link>
  );
}
