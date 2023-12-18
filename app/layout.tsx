import './globals.css';

import type { Metadata } from 'next';

import StoreProvider from '@/components/StoreProvider';
import { ThemeProvider } from '@/components/ThemeProvider';
import { inter } from '@/fonts';

import Header from './_components/Header';

export const metadata: Metadata = {
  title: 'Fin & Flavor',
  description: 'Indulge in diverse flavors at Fin & Flavor - a culinary haven!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <StoreProvider>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="h-screen bg-secondary">
              <Header />
              <main className="h-fit">{children}</main>
            </div>
          </ThemeProvider>
        </body>
      </StoreProvider>
    </html>
  );
}
