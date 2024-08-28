import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/components/ReduxProvider";
import NextTopLoader from "nextjs-toploader";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Oson buyurtma",
  description:
    "OsonBuyurtma - bu restoran va kafelarni onlayn bron qilishning zamonaviy va qulay platformasi. Bizning xizmatimiz orqali siz sevimli taomxonangizda joyni bir necha daqiqada band qilishingiz mumkin. Vaqtingizni tejang, navbatlardan qoching va o'zingizga yoqqan joyda unutilmas vaqt o'tkazishdan bahramand bo'ling!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NextTopLoader />
            {children}
            <Toaster />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
