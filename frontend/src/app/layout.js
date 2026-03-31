import './globals.css';
import { AuthProvider } from '../contexts/AuthContext';

export const metadata = {
  title: 'Spiritual Journey - 3D Experience',
  description: 'Immerse yourself in a divine 3D spiritual experience',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
