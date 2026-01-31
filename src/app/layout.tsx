import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { BIZ_UDPGothic, Roboto_Slab } from "next/font/google";
import Footer from "@/components/Footer";

const bizUDPGothic = BIZ_UDPGothic({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-biz-ud-p-gothic",
});

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-roboto-slab",
});

export const metadata: Metadata = {
  title: "KCL Works",
  description: "KCLの学生による作品を紹介するためのプラットフォーム",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${bizUDPGothic.variable} ${robotoSlab.variable}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
