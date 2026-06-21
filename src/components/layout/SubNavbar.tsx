import { BorsaWidget } from "@/components/layout/BorsaWidget";

export function SubNavbar() {
  return (
    <nav
      aria-label="Canlı piyasalar"
      className="border-b border-white/[0.05] bg-[#0c1524]"
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <BorsaWidget />
      </div>
    </nav>
  );
}
