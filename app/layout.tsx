import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Polaris — Robit & Naiqo (1 Year Anniversary)",
  description: "A chromatic distillation & sensory journey celebrating 365 days of orbiting together.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="antialiased selection:bg-amber-400 selection:text-neutral-900 min-h-screen">
        {children}
      </body>
    </html>
  );
}
