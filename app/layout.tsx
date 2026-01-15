import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Happy 21st Anniversary! 💝",
  description: "A special gift for the most amazing person in the world",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
