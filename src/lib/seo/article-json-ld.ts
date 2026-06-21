import { getCategoryHref } from "@/lib/news/category-href";
import { absoluteUrl, SITE_NAME, SITE_URL } from "@/lib/site";
import type { NewsItem } from "@/lib/types/news";

export function buildArticleJsonLd(article: NewsItem) {
  const articleUrl = absoluteUrl(article.href);
  const categoryUrl = absoluteUrl(getCategoryHref(article.category));

  return [
    {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      headline: article.title,
      description: article.excerpt ?? article.title,
      image: article.imageUrl ? [article.imageUrl] : undefined,
      datePublished: article.publishedAtISO,
      dateModified: article.updatedAtISO ?? article.publishedAtISO,
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
        },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": articleUrl,
      },
      articleSection: article.category,
      inLanguage: "tr-TR",
    },
    {
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
    },
  ];
}

export function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "Denizli ve çevresinden güncel haberler, son dakika gelişmeleri, spor, ekonomi ve yaşam.",
    inLanguage: "tr-TR",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}
