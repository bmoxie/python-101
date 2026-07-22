import type { Metadata } from "next";
import { Fraunces, JetBrains_Mono, Nunito } from "next/font/google";
import { ProgressProvider } from "@/components/ProgressProvider";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["500", "700", "800"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "Python 101 — Quest Log",
  description:
    "A two-week interactive Python starter course with in-browser practice and check-off progress.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${nunito.variable} ${jetbrains.variable} h-full`}
    >
      <body className="min-h-full antialiased">
        <ProgressProvider>
          <div className="shell">
            <SiteHeader />
            {children}
          </div>
        </ProgressProvider>
      </body>
    </html>
  );
}
