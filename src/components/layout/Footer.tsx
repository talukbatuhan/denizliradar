import Image from "next/image";
import Link from "next/link";
import {
  FacebookIcon,
  InstagramIcon,
  XIcon,
  YoutubeIcon,
} from "@/components/icons/SocialIcons";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { mainNavItems } from "@/lib/constants/navigation";
import { socialLinks } from "@/lib/constants/social";

const socialIcons = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  x: XIcon,
  youtube: YoutubeIcon,
};

export function Footer() {
  return (
    <footer className="mt-auto border-t border-white/[0.05] bg-[#0c1524]">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="flex flex-col gap-8 py-10 lg:flex-row lg:items-start lg:justify-between lg:gap-12 lg:py-12">
          <div className="flex flex-col gap-6">
            <Link
              href="/"
              className="group flex w-fit items-center gap-4 transition-opacity hover:opacity-90"
            >
              <Image
                src="/denizliradar.png"
                alt="Denizli Radar"
                width={52}
                height={52}
                className="h-11 w-11 object-contain sm:h-[52px] sm:w-[52px]"
              />
              <span className="font-nav text-base font-bold uppercase tracking-[0.12em] text-white sm:text-lg">
                DENİZLİRADAR.COM
              </span>
            </Link>

            <p className="max-w-sm text-sm leading-relaxed text-white/50">
            Denizli'nin duayen haber sitesiyle gündemi anbean takip edin.
            </p>
          </div>

          <nav aria-label="Footer menü" className="lg:pt-1">
            <p className="font-nav mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">
              Kategoriler
            </p>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2.5 sm:grid-cols-4">
              {mainNavItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-nav text-[11px] font-bold uppercase tracking-[0.1em] text-white/65 transition-colors hover:text-white sm:text-xs"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:pt-1">
            <p className="font-nav mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">
              Bizi Takip Edin
            </p>
            <ul className="flex flex-wrap items-center gap-2.5">
              <li>
                <ThemeToggle />
              </li>
              {socialLinks.map((social) => {
                const Icon = socialIcons[social.icon];

                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="inline-flex size-10 items-center justify-center border border-white/10 bg-white/[0.03] text-white/70 transition-colors hover:border-white/25 hover:bg-white/[0.08] hover:text-white"
                    >
                      <Icon className="size-4" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/[0.06] py-5">
          <p className="text-center text-[11px] text-white/40 sm:text-xs">
            © {new Date().getFullYear()} Denizli Radar — Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}
