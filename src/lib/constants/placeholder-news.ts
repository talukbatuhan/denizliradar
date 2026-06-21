export type NewsItem = {
  id: string;
  title: string;
  excerpt?: string;
  category: string;
  href: string;
  imageUrl: string;
  publishedAt: string;
};

export const topStories: NewsItem[] = [
  {
    id: "1",
    title: "Denizli'de yeni kültür merkezi projesi tanıtıldı",
    excerpt:
      "Kent merkezinde hayata geçirilecek proje, genç sanatçılara modern bir buluşma alanı sunacak.",
    category: "Gündem",
    href: "/gundem/denizli-kultur-merkezi",
    imageUrl:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    publishedAt: "21 Haziran 2026",
  },
  {
    id: "2",
    title: "Pamukkale'de turizm sezonu rekor ziyaretçi sayısıyla açıldı",
    excerpt:
      "Bölgedeki otel doluluk oranları geçen yılın aynı dönemine göre yükselişte.",
    category: "Denizli",
    href: "/denizli/pamukkale-turizm",
    imageUrl:
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=80",
    publishedAt: "21 Haziran 2026",
  },
  {
    id: "3",
    title: "Denizlispor yeni sezon hazırlıklarına start verdi",
    excerpt:
      "Yeşil-siyahlılar, kamp programını açıkladı; taraftarlar yeni transferleri merakla bekliyor.",
    category: "Spor",
    href: "/spor/denizlispor-hazirlik",
    imageUrl:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195778?auto=format&fit=crop&w=1200&q=80",
    publishedAt: "20 Haziran 2026",
  },
  {
    id: "4",
    title: "Denizli OSB'de ihracat rakamları yükselişte",
    excerpt:
      "Tekstil ve makine sektöründeki artış, bölge ekonomisine ivme kazandırıyor.",
    category: "Ekonomi",
    href: "/ekonomi/osb-ihracat",
    imageUrl:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    publishedAt: "20 Haziran 2026",
  },
];

export const sideStories: NewsItem[] = [
  {
    id: "s1",
    title: "Merkezefendi'de altyapı çalışmaları hız kazandı",
    category: "Denizli",
    href: "/denizli/altyapi-calismalari",
    imageUrl:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
    publishedAt: "21 Haziran 2026",
  },
  {
    id: "s2",
    title: "Üniversite sınavına Denizli'de rekor başvuru",
    category: "Eğitim",
    href: "/egitim/universite-sinavi-basvuru",
    imageUrl:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80",
    publishedAt: "21 Haziran 2026",
  },
  {
    id: "s3",
    title: "Honaz'da doğa yürüyüşü festivali başlıyor",
    category: "Yaşam",
    href: "/yasam/honaz-festival",
    imageUrl:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80",
    publishedAt: "20 Haziran 2026",
  },
];

export const gridNews: NewsItem[] = [
  {
    id: "g1",
    title: "Denizli Büyükşehir Belediyesi ulaşım ağını genişletiyor",
    category: "Gündem",
    href: "/gundem/ulasim-agi",
    imageUrl:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
    publishedAt: "21 Haziran 2026",
  },
  {
    id: "g2",
    title: "Acıpayam'da tarım kooperatifine yeni yatırım desteği",
    category: "Ekonomi",
    href: "/ekonomi/acipayam-kooperatif",
    imageUrl:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80",
    publishedAt: "21 Haziran 2026",
  },
  {
    id: "g3",
    title: "Denizli'de genç basketbol turnuvası final heyecanı yaşandı",
    category: "Spor",
    href: "/spor/basketbol-turnuvasi",
    imageUrl:
      "https://images.unsplash.com/photo-1546519638-68ebfa8244a8?auto=format&fit=crop&w=800&q=80",
    publishedAt: "20 Haziran 2026",
  },
  {
    id: "g4",
    title: "Pamukkale Üniversitesi yeni araştırma merkezini açtı",
    category: "Eğitim",
    href: "/egitim/pau-arastirma-merkezi",
    imageUrl:
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80",
    publishedAt: "20 Haziran 2026",
  },
  {
    id: "g5",
    title: "Çivril'de deprem tatbikatı vatandaşlarla birlikte yapıldı",
    category: "Denizli",
    href: "/denizli/civril-deprem-tatbikati",
    imageUrl:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80",
    publishedAt: "19 Haziran 2026",
  },
  {
    id: "g6",
    title: "Denizli'de yaz konserleri programı açıklandı",
    category: "Yaşam",
    href: "/yasam/yaz-konserleri",
    imageUrl:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=800&q=80",
    publishedAt: "19 Haziran 2026",
  },
  {
    id: "g7",
    title: "Serinhisar'da geotermal yatırımlar hız kazandı",
    category: "Ekonomi",
    href: "/ekonomi/serinhisar-geotermal",
    imageUrl:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80",
    publishedAt: "19 Haziran 2026",
  },
  {
    id: "g8",
    title: "Denizli Emniyeti hız denetimlerinde rekor ceza uyguladı",
    category: "Asayiş",
    href: "/asayis/hiz-denetimi",
    imageUrl:
      "https://images.unsplash.com/photo-1449965408864-49621a873204?auto=format&fit=crop&w=800&q=80",
    publishedAt: "18 Haziran 2026",
  },
  {
    id: "g9",
    title: "Yerel seçim sonrası meclis ilk oturumunu gerçekleştirdi",
    category: "Siyaset",
    href: "/siyaset/meclis-oturumu",
    imageUrl:
      "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=800&q=80",
    publishedAt: "18 Haziran 2026",
  },
];

export type CategorySectionData = {
  categoryLabel: string;
  categoryHref: string;
  featured: NewsItem;
  secondary: NewsItem[];
};

export const dunyaCategorySection: CategorySectionData = {
  categoryLabel: "DÜNYA",
  categoryHref: "/dunya",
  featured: {
    id: "d-featured",
    title:
      "Avrupa Birliği liderleri iklim zirvesinde yeni emisyon hedeflerini açıkladı",
    category: "Dünya",
    href: "/dunya/ab-iklim-zirvesi",
    imageUrl:
      "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1200&q=80",
    publishedAt: "21 Haziran 2026",
  },
  secondary: [
    {
      id: "d1",
      title: "ABD Federal Rezerv faiz kararını açıkladı, piyasalar yükselişte",
      category: "Dünya",
      href: "/dunya/fed-faiz-karari",
      imageUrl:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80",
      publishedAt: "21 Haziran 2026",
    },
    {
      id: "d2",
      title: "Orta Doğu'da ateşkes görüşmeleri yeniden başladı",
      category: "Dünya",
      href: "/dunya/ateskes-gorusmeleri",
      imageUrl:
        "https://images.unsplash.com/photo-1586339949916-3e9457bef6f3?auto=format&fit=crop&w=600&q=80",
      publishedAt: "20 Haziran 2026",
    },
    {
      id: "d3",
      title: "Japonya'da deprem sonrası acil yardım çalışmaları sürüyor",
      category: "Dünya",
      href: "/dunya/japonya-deprem",
      imageUrl:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
      publishedAt: "20 Haziran 2026",
    },
    {
      id: "d4",
      title: "BM Genel Kurulu barış gücü misyonlarını genişletti",
      category: "Dünya",
      href: "/dunya/bm-baris-gucu",
      imageUrl:
        "https://images.unsplash.com/photo-1504711434967-e3389a5c8a00?auto=format&fit=crop&w=600&q=80",
      publishedAt: "19 Haziran 2026",
    },
  ],
};
