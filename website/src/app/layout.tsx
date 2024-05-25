import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { CSSProperties } from "react";

import { headers } from 'next/headers';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Minecraft stockpile",
  description: "Hoi Bryan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <h1 className={"sitetitle"}>Minecraft stockpile</h1>
        <nav className="navbar">
          <ul>
            <li>
              <Link href={'/'}>Home</Link>
            </li>
            <li>
              <Link href={'/stock'}>Stockpile</Link>
            </li>
          </ul>
        </nav>
        {children}
        </body>
    </html>
  );
}
