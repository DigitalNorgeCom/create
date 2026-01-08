import './globals.css';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Baseline',
  description: 'Baseline SaaS starter'
};

export default function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="layout">
          <header className="header">
            <div className="logo">Baseline</div>
          </header>
          <main className="main">{children}</main>
        </div>
      </body>
    </html>
  );
}
