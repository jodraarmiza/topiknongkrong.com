import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Topik Nongkrong",
  description: "Spin roulette topik buat obrolan nongkrong yang seru!",
  verification: {
    google: ["0w8Pbdn9h11AGCJu9EgOqmXnP3wCLwVGnMpGEbMdCy4", "FNgCJOB9FcCWcdwL3oMCLed1j9qQ98uQADSD873tL2g"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
