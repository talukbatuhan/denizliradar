"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export default function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(() => {
    const errorParam = searchParams.get("error");

    if (errorParam === "auth") {
      return "Giriş başarısız. Bilgilerinizi kontrol edin.";
    }

    if (errorParam === "setup") {
      return "Supabase yapılandırması eksik. .env.local dosyasını kontrol edin.";
    }

    return null;
  });
  const [loading, setLoading] = useState(false);

  if (!isSupabaseConfigured()) {
    return (
      <div className="mx-auto max-w-md border border-white/10 bg-white/5 p-6">
        <h1 className="font-nav text-lg font-bold uppercase tracking-[0.12em]">
          Kurulum Gerekli
        </h1>
        <p className="mt-3 text-sm text-white/70">
          `.env.local` dosyasına Supabase URL ve publishable key ekleyin, ardından
          migration SQL dosyasını Supabase panelinde çalıştırın.
        </p>
      </div>
    );
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    router.push(searchParams.get("next") ?? "/admin/haberler");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-md border border-white/10 bg-white/5 p-6">
      <h1 className="font-nav text-lg font-bold uppercase tracking-[0.12em]">
        CMS Girişi
      </h1>
      <p className="mt-2 text-sm text-white/60">
        Denizli Radar içerik yönetim paneli
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {error && (
          <p className="border border-red-400/40 bg-red-950/40 px-3 py-2 text-sm text-red-200">
            {error}
          </p>
        )}

        <label className="block space-y-2">
          <span className="text-xs uppercase tracking-[0.14em] text-white/50">
            E-posta
          </span>
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full border border-white/15 bg-[#0c1524] px-3 py-2 text-sm outline-none focus:border-white/40"
          />
        </label>

        <label className="block space-y-2">
          <span className="text-xs uppercase tracking-[0.14em] text-white/50">
            Şifre
          </span>
          <input
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full border border-white/15 bg-[#0c1524] px-3 py-2 text-sm outline-none focus:border-white/40"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-white px-4 py-2.5 text-sm font-bold uppercase tracking-[0.1em] text-[#991b1b] disabled:opacity-60"
        >
          {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
        </button>
      </form>
    </div>
  );
}
