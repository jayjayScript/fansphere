// app/layout.tsx
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import ClientWrapper from "@/components/ClientWrapper"; // For Tawk.to
import ModalClientWrapper from "@/components/ModalClientWrapper"; // For NextAuth.js
import { Suspense } from "react";
import ConditionalTawkToChat from "@/components/ConditionalTawkToChat";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FansPhere",
  description: "Meet up with Top Celebtrities and Become a Top Fan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased scroll-m-1`}>
        <Suspense>
          <ClientWrapper>
            <ModalClientWrapper>
              {children}
              <ConditionalTawkToChat />
            </ModalClientWrapper>
          </ClientWrapper>
        </Suspense>
      </body>
    </html>
  );
}
