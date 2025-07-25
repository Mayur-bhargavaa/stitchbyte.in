import type { Metadata } from "next";
import { Inter, Poppins, Pacifico } from "next/font/google";
import "./globals.css";
import AuditButton from '../components/AuditButton'; // adjust path if needed

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
})

const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pacifico',
})

export const metadata: Metadata = {
  title: "Stitchbyte - Digital Agency for Startups | Launch Your Digital Identity in 7 Days",
  description: "Professional WordPress development, Shopify stores, and custom web apps for startups. Starting at ₹10,000. 7-day delivery guarantee. Mobile-first, SEO-ready solutions.",
  keywords: "web development, startup, digital agency, WordPress, Shopify, custom web apps, mobile responsive, SEO",
  openGraph: {
    title: "Stitchbyte - Digital Agency for Startups",
    description: "Launch your startup's digital identity in 7 days. Starting at ₹10,000.",
    type: "website",
    url: "https://stitchbyte.in",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link href="https://cdn.jsdelivr.net/npm/remixicon@4.1.0/fonts/remixicon.css" rel="stylesheet" />
      </head>
      <body
        className={`${inter.variable} ${poppins.variable} ${pacifico.variable} font-poppins antialiased`}
      >
        {children}
        <AuditButton />
      </body>
    </html>
  );
}