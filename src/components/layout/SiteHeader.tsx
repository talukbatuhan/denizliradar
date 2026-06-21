import { Navbar } from "@/components/layout/Navbar";
import { SubNavbar } from "@/components/layout/SubNavbar";

export function SiteHeader() {
  return (
    <div className="sticky top-0 z-50 w-full">
      <Navbar />
      <SubNavbar />
    </div>
  );
}
