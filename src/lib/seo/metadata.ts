import type { Metadata } from "next";
import type { NewsItem } from "@/lib/types/news";
import {
  DEFAULT_OG_IMAGE_PATH,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
  absoluteUrl,
} from "@/lib/site";

const META_DESCRIPTION_MAX = 160;

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
    types: {
      "application/rss+xml": [{ url: "/feed.xml", title: `${SITE_NAME} RSS` }],
    },
  },
};

export function truncateMetaDescription(
  value: string,
  maxLength = META_DESCRIPTION_MAX,
): string {
  const normalized = value.replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLength) return normalized;
  return `${normalized.slice(0, maxLength - 1).trimEnd()}…`;
}

function toTwitterImages(
  images: NonNullable<typeof defaultOpenGraph.images>,
): string[] {
  return images.map((image) => (typeof image === "string" ? image : image.url));
}

function resolveImageUrl(
  image: string | URL | { url: string | URL; alt?: string },
): string {
  if (typeof image === "string") return image;
  if (image instanceof URL) return image.toString();
  return typeof image.url === "string" ? image.url : image.url.toString();
}

function resolveTwitterImagesFromOg(
  images: Metadata["openGraph"] extends infer O
    ? O extends { images?: infer I }
      ? I
      : never
    : never,
): string[] | undefined {
  if (!images) return undefined;

  const list = Array.isArray(images) ? images : [images];
  return list.map((image) => resolveImageUrl(image as string | URL | { url: string | URL }));
}

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  openGraph?: Metadata["openGraph"];
  twitter?: Metadata["twitter"];
  robots?: Metadata["robots"];
};

export function buildPageMetadata(options: PageMetadataOptions): Metadata {
  const canonicalPath = options.path.startsWith("/")
    ? options.path
    : `/${options.path}`;
  const description = truncateMetaDescription(options.description);
  const resolvedOgImages =
    options.openGraph &&
    "images" in options.openGraph &&
    options.openGraph.images
      ? options.openGraph.images
      : defaultOpenGraph.images;
  const twitterImages =
    resolveTwitterImagesFromOg(resolvedOgImages) ??
    toTwitterImages(defaultOpenGraph.images);

  return {
    title: options.title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    robots: options.robots ?? rootMetadata.robots,
    openGraph: {
      ...defaultOpenGraph,
      title: options.title,
      description,
      url: absoluteUrl(canonicalPath),
      ...options.openGraph,
      images: resolvedOgImages,
    },
    twitter: {
      ...defaultTwitter,
      title: options.title,
      description,
      images: twitterImages,
      ...options.twitter,
    },
  };
}

export function buildArticleMetadata(article: NewsItem): Metadata {
  const description = truncateMetaDescription(article.excerpt ?? article.title);
  const path = `/haber/${article.slug}`;
  const ogImages = article.imageUrl
    ? [{ url: article.imageUrl, alt: article.title }]
    : defaultOpenGraph.images;

  return buildPageMetadata({
    title: article.title,
    description,
    path,
    openGraph: {
      type: "article",
      title: article.title,
      description,
      url: absoluteUrl(path),
      publishedTime: article.publishedAtISO,
      modifiedTime: article.updatedAtISO,
      section: article.category,
      tags: [article.category],
      authors: [SITE_NAME],
      locale: "tr_TR",
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description,
      images: article.imageUrl ? [article.imageUrl] : undefined,
    },
  });
}

export function buildCategoryMetadata(options: {
  title: string;
  description: string;
  path: string;
  label: string;
}): Metadata {
  return buildPageMetadata({
    title: options.title,
    description: options.description,
    path: options.path,
    openGraph: {
      type: "website",
      title: `${options.label} | ${SITE_NAME}`,
      description: truncateMetaDescription(options.description),
    },
  });
}
