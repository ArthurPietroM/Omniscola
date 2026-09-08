import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';

const geist = Geist({ 
  subsets: ['latin'], 
  variable: '--font-geist-sans' 
});

export const metadata: Metadata = {
  title: 'Omniscola | Gestão Escolar',
  description: 'Siste  de Gestão Escolar Integrado - Senac',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#F8FAFC] text-slate-800">
        {children}
      </body>
    </html>
  );
}