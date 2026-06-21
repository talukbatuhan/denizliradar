import Link from "next/link";
import { signOutAction } from "@/app/admin/actions";
import { requireAdminUser } from "@/lib/supabase/auth";

export default async function AdminProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await requireAdminUser();

  return (
    <>
      <header className="border-b border-white/10 bg-[#991b1b]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/haberler"
              className="font-nav text-sm font-bold uppercase tracking-[0.12em]"
            >
              Denizli Radar CMS
            </Link>
            <Link
              href="/admin/haberler"
              className="text-sm text-white/80 hover:text-white"
            >
              Haberler
            </Link>
            <Link
              href="/admin/haberler/yeni"
              className="text-sm text-white/80 hover:text-white"
            >
              Yeni Haber
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm text-white/80 hover:text-white">
              Siteyi Gör
            </Link>
            <form action={signOutAction}>
              <button
                type="submit"
                className="border border-white/20 px-3 py-1.5 text-sm hover:bg-white/10"
              >
                Çıkış
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </>
  );
}
