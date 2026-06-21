type CategoryBannerProps = {
  label: string;
};

export function CategoryBanner({ label }: CategoryBannerProps) {
  return (
    <header className="flex items-stretch border border-radar-border bg-[#0c1524]">
      <div className="w-1.5 shrink-0 bg-[#991b1b]" aria-hidden="true" />
      <div className="px-4 py-3 sm:px-5 sm:py-4">
        <h1 className="font-nav text-xl font-bold uppercase tracking-[0.14em] text-white sm:text-2xl">
          {label}
        </h1>
      </div>
    </header>
  );
}
