import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Briqona — Business OS",
  description: "A modern multi-tenant SaaS platform for growing teams.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
