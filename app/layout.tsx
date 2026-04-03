import type { Metadata } from "next";
import "./globals.css";
import LoadingScreen from "./components/LoadingScreen";

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
        <LoadingScreen />
        {children}
      </body>
    </html>
  );
}
