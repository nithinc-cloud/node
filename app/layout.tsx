import type { Metadata } from "next";
import localFont from "next/font/local";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import "./globals.css";

const manrope = localFont({
  src: [
    {
      path: "../assets/fonts/manrope-v20-latin/manrope-v20-latin-200.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../assets/fonts/manrope-v20-latin/manrope-v20-latin-regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-manrope",
});

const ibmPlexMono = localFont({
  src: [
    {
      path: "../assets/fonts/ibm-plex-mono-v20-latin/ibm-plex-mono-v20-latin-300.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../assets/fonts/ibm-plex-mono-v20-latin/ibm-plex-mono-v20-latin-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/ibm-plex-mono-v20-latin/ibm-plex-mono-v20-latin-500.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-ibm-plex-mono",
});

export const metadata: Metadata = {
  title: "SAST Dashboard",
  description: "SAST Dashboard UI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <DashboardShell>{children}</DashboardShell>
      </body>
    </html>
  );
}
