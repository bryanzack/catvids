import type { Metadata } from "next";
import { Inter, Libre_Barcode_128_Text, Roboto_Mono } from "next/font/google";
import "./globals.css";
import SessionWrapper from "./components/SessionWrapper";

const inter = Inter({ subsets: ["latin"] });
const roboto_mono = Inter({
  subsets: ["latin"],
  variable: '--font-roboto_mono'
})

const barcode = Libre_Barcode_128_Text({
   weight: "400",
   subsets: ['latin'],
   variable: '--font-barcode'
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body className={`${roboto_mono.variable} ${barcode.variable}`}>{children}</body>
      </html>
      
    </SessionWrapper>
  );
}
