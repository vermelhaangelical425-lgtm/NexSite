import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "NexSite | Criação de Sites",
  description: "Plataforma de criação e venda de sites personalizados.",
  icons: {
    icon: "https://media.discordapp.net/attachments/1525567087785803856/1551807680224567377/AAAAAGSURBVAMAOtveHKOSHaQAAAAASUVORK5CYII.png?ex=6ab35106&is=6ab1ff86&hm=66712a96a5fe7414435b6a0df35680d668227fcb0f9f49a441eb1fc82b260de3&=&format=webp&quality=lossless"
  },
  verification: {
    google: "vbN2nqjL8e_SZqz4gu3dJplW9b-LlWJ6fu1MuQ5h-3M",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
