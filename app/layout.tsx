import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { GlobalContextProvider } from '@/provider/global-context-provider';
import TanStackReactQueryProvider from '@/provider/tanstack-react-query-provider';
import { PHProvider } from '@/provider/posthog-provider';
import { Analytics } from "@vercel/analytics/next"

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Adarsh Jaiswal',
  description: 'Portfolio of Adarsh Jaiswal',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <PHProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <TanStackReactQueryProvider>
            <GlobalContextProvider>{children}</GlobalContextProvider>
          </TanStackReactQueryProvider>
          <Analytics />
        </body>
      </PHProvider>
    </html>
  );
}
