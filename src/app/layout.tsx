import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";

const hindSiliguri = Hind_Siliguri({ 
  subsets: ["bengali"],
  weight: ["300", "400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: "Organic Food - ১০০% পরীক্ষিত সমাধান",
  description: "দাম্পত্য জীবনে সুখ ফেরাতে ১০০% পরীক্ষিত সমাধান",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body className={hindSiliguri.className}>{children}</body>
    </html>
  );
}