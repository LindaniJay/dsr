
import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { ToastProvider } from "../components/ToastProvider";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const space = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IGHOST | Architecture of Culture",
  description:
    "IGHOST Edutainment NPC develops artists and communities through events, awards, camps, wellness support, women empowerment, and drug awareness.",
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jakarta.variable} ${space.variable} antialiased min-h-screen`} style={{ fontFamily: "var(--font-jakarta), sans-serif" }}>
        <ToastProvider>
          <NavBar />
          <main>{children}</main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
