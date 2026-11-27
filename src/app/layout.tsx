import { Suspense } from "react";

import { Geist, Geist_Mono, Mulish } from "next/font/google";

import type { Metadata } from "next";

import { Navbar } from "@/components/navbar";
import { NavigationProgress } from "@/components/navigation-progress";
import { Providers } from "@/components/providers";
import { cn } from "@/lib/utils";

import "./globals.css";

const fontFamily = Mulish({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevVault",
  description:
    "A developer knowledge hub: save code snippets, commands, prompts, notes and links in one searchable place.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        fontFamily.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <Suspense>
          <NavigationProgress />
        </Suspense>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
