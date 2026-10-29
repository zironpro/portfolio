import type { Metadata } from "next";
import PrintingPage from "@/features/printing/printing-view";

export const metadata: Metadata = {
  title: "Printing — Premium Print & Packaging Solutions",
  description:
    "Luxury finishes, foil stamping, packaging boxes, menus, corporate brochures, and large-format architectural signage printed to perfection.",
  alternates: {
    canonical: "https://zironpro.ae/printing",
  },
  openGraph: {
    title: "Printing & Packaging | Ziron Pro",
    description:
      "Luxury finishes, foil stamping, packaging, menus, and large-format signage.",
    url: "https://zironpro.ae/printing",
  },
};

export default function Printing() {
  return <PrintingPage />;
}
