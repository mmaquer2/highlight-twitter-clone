import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GlobalSocketContextProvider } from "./context/store";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Highlights",
  description: "a twitter clone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalSocketContextProvider>{children}</GlobalSocketContextProvider>
      </body>
    </html>
  );
}
