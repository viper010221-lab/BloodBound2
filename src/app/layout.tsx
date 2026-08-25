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
  title: "BloodBound SMP | Official Website & Apply Portal",
  description: "Apply for BloodBound SMP, view server rules, read live Discord chat, and check online player stats.",
  openGraph: {
    title: "BloodBound SMP | Official Website",
    description: "Apply for BloodBound SMP, view server rules, read live Discord chat, and check online player stats.",
    siteName: "BloodBound SMP",
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
