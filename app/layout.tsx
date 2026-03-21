import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DXTLabs — Where Biology Meets Computing",
  description: "DXTLabs is a biocomputing company bridging neuroscience and computer science to build the next generation of biological computing systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-dxt-black text-white">
        {children}
      </body>
    </html>
  );
}
