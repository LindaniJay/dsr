
import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
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
  title: "Durban Student Stays | Student Accommodation in Durban",
  description:
    "Durban Student Stays helps students and young renters discover rooms, shared apartments, and student-friendly accommodation near UKZN and DUT.",
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
