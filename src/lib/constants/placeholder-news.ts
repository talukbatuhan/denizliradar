import { createArticle } from "@/lib/news/article-factory";

export type NewsItem = {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  category: string;
  href: string;
  imageUrl: string;
  publishedAt: string;
  publishedAtISO: string;
  readTimeMinutes: number;
  content?: string[];
};

export const topStories: NewsItem[] = [
  createArticle({
    id: "1",
    slug: "denizli-kultur-merkezi",
    title: "Denizli'de yeni kültür merkezi projesi tanıtıldı",
    excerpt:
      "Kent merkezinde hayata geçirilecek proje, genç sanatçılara modern bir buluşma alanı sunacak.",
    category: "Gündem",
    imageUrl:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    hoursAgo: 2,
    readTimeMinutes: 4,
    content: [
      "Denizli Büyükşehir Belediyesi, kent merkezinde hayata geçirilecek yeni kültür merkezi projesini tanıttı. Proje kapsamında sergi salonları, atölyeler ve performans alanları yer alacak.",
      "Belediye yetkilileri, genç sanatçılara uygun fiyatlı çalışma alanları sunulacağını belirtti. Projenin önümüzdeki yılın ilk yarısında tamamlanması hedefleniyor.",
    ],
  }),
  createArticle({
    id: "2",
    slug: "pamukkale-turizm",
    title: "Pamukkale'de turizm sezonu rekor ziyaretçi sayısıyla açıldı",
    excerpt:
      "Bölgedeki otel doluluk oranları geçen yılın aynı dönemine göre yükselişte.",
    category: "Denizli",
    imageUrl:
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=80",
    hoursAgo: 3,
    readTimeMinutes: 3,
    content: [
      "Pamukkale travertenlerinde yeni turizm sezonu rekor ziyaretçi sayısıyla başladı. Bölgedeki otellerde doluluk oranı yüzde 85'i aştı.",
      "Turizm işletmecileri, yabancı turist akışındaki artışın sezon boyunca süreceğini öngörüyor.",
    ],
  }),
  createArticle({
    id: "3",
    slug: "denizlispor-hazirlik",
    title: "Denizlispor yeni sezon hazırlıklarına start verdi",
    excerpt:
      "Yeşil-siyahlılar, kamp programını açıkladı; taraftarlar yeni transferleri merakla bekliyor.",
    category: "Spor",
    imageUrl:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195778?auto=format&fit=crop&w=1200&q=80",
    hoursAgo: 5,
    readTimeMinutes: 3,
    content: [
      "Denizlispor, yeni sezon hazırlıklarına resmen start verdi. Kulüp yönetimi kamp programını kamuoyuyla paylaştı.",
      "Teknik ekip, genç oyunculara forma şansı vereceğini açıkladı. Taraftarlar yeni transferleri merakla bekliyor.",
    ],
  }),
  createArticle({
    id: "4",
    slug: "osb-ihracat",
    title: "Denizli OSB'de ihracat rakamları yükselişte",
    excerpt:
      "Tekstil ve makine sektöründeki artış, bölge ekonomisine ivme kazandırıyor.",
    category: "Ekonomi",
    imageUrl:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    hoursAgo: 6,
    readTimeMinutes: 4,
    content: [
      "Denizli Organize Sanayi Bölgesi'nde ihracat rakamları son çeyrekte yükseliş gösterdi. Tekstil ve makine sektörleri öne çıkıyor.",
      "OSB yönetimi, yeni yatırımların istihdamı artıracağını vurguladı.",
    ],
  }),
];

export const sideStories: NewsItem[] = [
  createArticle({
    id: "s1",
    slug: "altyapi-calismalari",
    title: "Merkezefendi'de altyapı çalışmaları hız kazandı",
    category: "Denizli",
    imageUrl:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
    hoursAgo: 4,
    readTimeMinutes: 2,
  }),
  createArticle({
    id: "s2",
    slug: "universite-sinavi-basvuru",
    title: "Üniversite sınavına Denizli'de rekor başvuru",
    category: "Eğitim",
    imageUrl:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80",
    hoursAgo: 7,
    readTimeMinutes: 2,
  }),
  createArticle({
    id: "s3",
    slug: "honaz-festival",
    title: "Honaz'da doğa yürüyüşü festivali başlıyor",
    category: "Yaşam",
    imageUrl:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80",
    hoursAgo: 10,
    readTimeMinutes: 2,
  }),
];

export const gridNews: NewsItem[] = [
  createArticle({
    id: "g1",
    slug: "ulasim-agi",
    title: "Denizli Büyükşehir Belediyesi ulaşım ağını genişletiyor",
    category: "Gündem",
    imageUrl:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
    hoursAgo: 1,
    readTimeMinutes: 3,
    content: [
      "Denizli Büyükşehir Belediyesi, toplu taşıma ağını genişletmek için yeni hatlar devreye alıyor.",
    ],
  }),
  createArticle({
    id: "g2",
    slug: "acipayam-kooperatif",
    title: "Acıpayam'da tarım kooperatifine yeni yatırım desteği",
    category: "Ekonomi",
    imageUrl:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80",
    hoursAgo: 3,
    readTimeMinutes: 3,
  }),
  createArticle({
    id: "g3",
    slug: "basketbol-turnuvasi",
    title: "Denizli'de genç basketbol turnuvası final heyecanı yaşandı",
    category: "Spor",
    imageUrl:
      "https://images.unsplash.com/photo-1546519638-68ebfa8244a8?auto=format&fit=crop&w=800&q=80",
    hoursAgo: 8,
    readTimeMinutes: 2,
  }),
  createArticle({
    id: "g4",
    slug: "pau-arastirma-merkezi",
    title: "Pamukkale Üniversitesi yeni araştırma merkezini açtı",
    category: "Eğitim",
    imageUrl:
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80",
    hoursAgo: 12,
    readTimeMinutes: 4,
  }),
  createArticle({
    id: "g5",
    slug: "civril-deprem-tatbikati",
    title: "Çivril'de deprem tatbikatı vatandaşlarla birlikte yapıldı",
    category: "Denizli",
    imageUrl:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80",
    hoursAgo: 18,
    readTimeMinutes: 3,
  }),
  createArticle({
    id: "g6",
    slug: "yaz-konserleri",
    title: "Denizli'de yaz konserleri programı açıklandı",
    category: "Yaşam",
    imageUrl:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=800&q=80",
    hoursAgo: 20,
    readTimeMinutes: 2,
  }),
  createArticle({
    id: "g7",
    slug: "serinhisar-geotermal",
    title: "Serinhisar'da geotermal yatırımlar hız kazandı",
    category: "Ekonomi",
    imageUrl:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80",
    hoursAgo: 24,
    readTimeMinutes: 3,
  }),
  createArticle({
    id: "g8",
    slug: "hiz-denetimi",
    title: "Denizli Emniyeti hız denetimlerinde rekor ceza uyguladı",
    category: "Asayiş",
    imageUrl:
      "https://images.unsplash.com/photo-1449965408864-49621a873204?auto=format&fit=crop&w=800&q=80",
    hoursAgo: 30,
    readTimeMinutes: 2,
  }),
  createArticle({
    id: "g9",
    slug: "meclis-oturumu",
    title: "Yerel seçim sonrası meclis ilk oturumunu gerçekleştirdi",
    category: "Siyaset",
    imageUrl:
      "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=800&q=80",
    hoursAgo: 36,
    readTimeMinutes: 4,
  }),
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
  featured: createArticle({
    id: "d-featured",
    slug: "ab-iklim-zirvesi",
    title:
      "Avrupa Birliği liderleri iklim zirvesinde yeni emisyon hedeflerini açıkladı",
    category: "Dünya",
    imageUrl:
      "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1200&q=80",
    hoursAgo: 2,
    readTimeMinutes: 5,
    content: [
      "Avrupa Birliği liderleri iklim zirvesinde 2030 emisyon hedeflerini güncelledi. Yeni plan, karbon nötr hedefe ulaşmayı hızlandırmayı amaçlıyor.",
      "Uzmanlar kararın küresel iklim politikalarına örnek teşkil edebileceğini belirtiyor.",
    ],
  }),
  secondary: [
    createArticle({
      id: "d1",
      slug: "fed-faiz-karari",
      title: "ABD Federal Rezerv faiz kararını açıkladı, piyasalar yükselişte",
      category: "Dünya",
      imageUrl:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80",
      hoursAgo: 4,
      readTimeMinutes: 3,
    }),
    createArticle({
      id: "d2",
      slug: "ateskes-gorusmeleri",
      title: "Orta Doğu'da ateşkes görüşmeleri yeniden başladı",
      category: "Dünya",
      imageUrl:
        "https://images.unsplash.com/photo-1586339949916-3e9457bef6f3?auto=format&fit=crop&w=600&q=80",
      hoursAgo: 6,
      readTimeMinutes: 3,
    }),
    createArticle({
      id: "d3",
      slug: "japonya-deprem",
      title: "Japonya'da deprem sonrası acil yardım çalışmaları sürüyor",
      category: "Dünya",
      imageUrl:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
      hoursAgo: 8,
      readTimeMinutes: 2,
    }),
    createArticle({
      id: "d4",
      slug: "bm-baris-gucu",
      title: "BM Genel Kurulu barış gücü misyonlarını genişletti",
      category: "Dünya",
      imageUrl:
        "https://images.unsplash.com/photo-1504711434967-e3389a5c8a00?auto=format&fit=crop&w=600&q=80",
      hoursAgo: 12,
      readTimeMinutes: 3,
    }),
  ],
};

export const allArticles: NewsItem[] = [
  ...topStories,
  ...sideStories,
  ...gridNews,
  dunyaCategorySection.featured,
  ...dunyaCategorySection.secondary,
];

export const popularArticles: NewsItem[] = [
  topStories[0],
  gridNews[0],
  dunyaCategorySection.featured,
];
