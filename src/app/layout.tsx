import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import localFont from "next/font/local";
import "./globals.css";
import Sidebar from "../components/Sidebar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Next Tasks",
  description: "Tasks Managements App created with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="md:p-8 p-4 bg-background w-full h-screen flex gap-4 md:gap-8">
              <Sidebar />
              <div className="w-full h-full border-2 border-zinc-200 bg-zinc-50 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white rounded-2xl overflow-y-auto p-6">{children}</div>
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
