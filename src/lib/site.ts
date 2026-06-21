export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://denizliradar.com";

export const SITE_NAME = "Denizli Radar";

export const SITE_TAGLINE = "Denizli'nin Haber Merkezi";

export const SITE_DESCRIPTION =
  "Denizli ve çevresinden güncel haberler, son dakika gelişmeleri, spor, ekonomi, siyaset ve yaşam haberleri.";

export const DEFAULT_OG_IMAGE_PATH = "/denizliradar.png";

export function absoluteUrl(path: string): string {
  return path.startsWith("http") ? path : `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
