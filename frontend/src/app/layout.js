import './globals.css';

export const metadata = {
  title: 'Spiritual Journey - 3D Experience',
  description: 'Immerse yourself in a divine 3D spiritual experience',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
