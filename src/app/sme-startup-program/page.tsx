import type { Metadata } from "next";
import Home from "../page";

export const metadata: Metadata = {
  title: "SME & Startup Co-Prosperity Program (중소기업·스타트업 상생 프로그램) | Tyler Media",
  description:
    "Tyler Media's dedicated sponsorship and global narrative partnership program empowering innovative Korean SMEs and startups with up to 50% fee support.",
  alternates: {
    canonical: "https://www.tylerrasch.com/sme-startup-program",
  },
  openGraph: {
    title: "SME & Startup Co-Prosperity Program | Tyler Media",
    description:
      "Tyler Media's dedicated sponsorship and global narrative partnership program empowering innovative Korean SMEs and startups.",
    url: "https://www.tylerrasch.com/sme-startup-program",
    type: "website",
  },
};

export default function SMEStartupProgramPage() {
  return <Home initialView="sme-startup-program" />;
}

