import './globals.css';

import { ConfigProvider } from 'antd';
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
            <ConfigProvider
              theme={{
                components: {
                  Slider: {
                    handleColor: '#FF8759',
                    dotActiveBorderColor: '#FF8759',
                    trackBg: '#FF8759',
                    trackHoverBg: '#FF8759',
                    handleActiveColor: '#F97316',
                  },
                },
              }}
            >
              <div className="h-screen bg-secondary">
                <Header />
                <main className="h-fit">{children}</main>
              </div>
            </ConfigProvider>
          </ThemeProvider>
        </body>
      </StoreProvider>
    </html>
  );
}
