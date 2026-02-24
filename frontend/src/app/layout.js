import './globals.css';
import { Noto_Sans_Devanagari } from 'next/font/google';

const notoSans = Noto_Sans_Devanagari({ 
  subsets: ['devanagari', 'latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata = {
  title: '🕉️ Spiritual Journey - 3D Experience',
  description: 'Immerse yourself in a divine 3D spiritual experience',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={notoSans.className}>{children}</body>
    </html>
  );
}
