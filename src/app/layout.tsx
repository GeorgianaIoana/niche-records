import type { Metadata } from "next";
import { Questrial, Geist } from "next/font/google";
import { Providers } from "@/store";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const questrial = Questrial({
  variable: "--font-questrial",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ro"
      className={cn("antialiased", questrial.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-screen flex flex-col bg-navy text-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
