import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Vinay Kumar® — Graphic Designer",
  description: "Independent graphic designer crafting thoughtful visual identities, campaigns and digital experiences.",
};
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return <html lang="en"><body>{children}</body></html>;
}