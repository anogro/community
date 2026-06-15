import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import Header from '@/components/layout/Header';

export const metadata: Metadata = {
  title: 'ANOGRO Community',
  description: '해외 캠프 및 스쿨링 정보',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <AuthProvider>
          <Header />
          <main style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', minHeight: 'calc(100vh - 70px)' }}>
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
