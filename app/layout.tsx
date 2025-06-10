import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MF-Dashboard',
  description: 'A modern dashboard',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className + ' bg-gray-100 dark:bg-gray-900 min-h-screen'}>
        {children}
      </body>
    </html>
  );
}
