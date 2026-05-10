import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Innovation Audit — Disrupta",
  description: "Valide a sobrevivência da sua ideia com o rigor técnico do Método SIID.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {/* Suppress MetaMask/Extension errors in dev overlay */}
        <Script
          id="suppress-extension-errors"
          strategy="afterInteractive"
        >
          {`
            window.addEventListener('unhandledrejection', (event) => {
              if (event.reason && (
                (event.reason.stack && event.reason.stack.includes('chrome-extension')) || 
                (event.reason.message && event.reason.message.includes('MetaMask'))
              )) {
                event.stopImmediatePropagation();
                event.preventDefault();
              }
            });
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
