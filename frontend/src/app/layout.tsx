import QueryProvider from '@/context/QueryProvider';
import './globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import RecoilProvider from '@/context/RecoilProvider';

const spokaFont = localFont({
  src: [
    {
      path: '../../public/fonts/SpoqaHanSansNeo-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/SpoqaHanSansNeo-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/SpoqaHanSansNeo-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={spokaFont.className}>
      <body className="w-full">
        <QueryProvider>
          <RecoilProvider>
            <div className="max-w-md min-h-screen mx-auto">
              <main>{children}</main>
            </div>
          </RecoilProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
