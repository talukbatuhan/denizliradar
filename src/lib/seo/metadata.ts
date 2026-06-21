import type { Metadata } from "next";
import {
  DEFAULT_OG_IMAGE_PATH,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
  absoluteUrl,
} from "@/lib/site";

export const defaultOpenGraph = {
  type: "website" as const,
  locale: "tr_TR",
  siteName: SITE_NAME,
  url: SITE_URL,
  images: [
    {
      url: absoluteUrl(DEFAULT_OG_IMAGE_PATH),
      alt: SITE_NAME,
    },
  ],
};

export const defaultTwitter = {
  card: "summary_large_image" as const,
  title: `${SITE_NAME} | ${SITE_TAGLINE}`,
  description: SITE_DESCRIPTION,
  images: [absoluteUrl(DEFAULT_OG_IMAGE_PATH)],
};

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    ...defaultOpenGraph,
    title: `${SITE_NAME} | ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
  },
  twitter: defaultTwitter,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
};

export function buildPageMetadata(options: {
  title: string;
  description: string;
  path: string;
  openGraph?: Metadata["openGraph"];
  twitter?: Metadata["twitter"];
}): Metadata {
  const canonicalPath = options.path.startsWith("/") ? options.path : `/${options.path}`;

  return {
    title: options.title,
    description: options.description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      ...defaultOpenGraph,
      title: options.title,
      description: options.description,
      url: absoluteUrl(canonicalPath),
      ...options.openGraph,
    },
    twitter: {
      ...defaultTwitter,
      title: options.title,
      description: options.description,
      ...options.twitter,
    },
  };
}
