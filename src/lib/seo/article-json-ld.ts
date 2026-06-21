import { getCategoryHref } from "@/lib/news/category-href";
import { absoluteUrl, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import type { NewsItem } from "@/lib/types/news";

const NEWS_HEADLINE_MAX = 110;

function truncateHeadline(value: string): string {
  if (value.length <= NEWS_HEADLINE_MAX) return value;
  return `${value.slice(0, NEWS_HEADLINE_MAX - 1).trimEnd()}…`;
}

function buildArticleBody(article: NewsItem): string | undefined {
  if (!article.content?.length) return article.excerpt;
  return article.content.join("\n\n");
}

function buildWordCount(article: NewsItem): number | undefined {
  const body = buildArticleBody(article);
  if (!body) return undefined;
  return body.split(/\s+/).filter(Boolean).length;
}

export function buildArticleJsonLd(article: NewsItem) {
  const articleUrl = absoluteUrl(article.href);
  const categoryUrl = absoluteUrl(getCategoryHref(article.category));
  const articleBody = buildArticleBody(article);
  const wordCount = buildWordCount(article);

  const newsArticle = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "@id": articleUrl,
    headline: truncateHeadline(article.title),
    description: article.excerpt ?? article.title,
    url: articleUrl,
    image: article.imageUrl
      ? [
          {
            "@type": "ImageObject",
            url: article.imageUrl,
            caption: article.title,
          },
        ]
      : undefined,
    datePublished: article.publishedAtISO,
    dateModified: article.updatedAtISO ?? article.publishedAtISO,
    isAccessibleForFree: true,
    inLanguage: "tr-TR",
    articleSection: article.category,
    ...(articleBody ? { articleBody } : {}),
    ...(wordCount ? { wordCount } : {}),
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/denizliradar.png"),
        width: 512,
        height: 512,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Ana Sayfa",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: article.category,
        item: categoryUrl,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: articleUrl,
      },
    ],
  };

  return [newsArticle, breadcrumb];
}

export function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: "tr-TR",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/denizliradar.png"),
      },
    },
  };
}
