export type NavItem = {
  label: string;
  href: string;
};

export const mainNavItems: NavItem[] = [
  { label: "Gündem", href: "/gundem" },
  { label: "Denizli", href: "/denizli" },
  { label: "Spor", href: "/spor" },
  { label: "Ekonomi", href: "/ekonomi" },
  { label: "Yaşam", href: "/yasam" },
  { label: "Kültür-Sanat", href: "/kultur-sanat" },
  { label: "Teknoloji", href: "/teknoloji" },
  { label: "Sağlık", href: "/saglik" },
];

export const utilityNavItems: NavItem[] = [
  { label: "Hava Durumu", href: "/hava-durumu" },
  { label: "Foto Galeri", href: "/galeri" },
  { label: "Video", href: "/video" },
  { label: "İletişim", href: "/iletisim" },
];
