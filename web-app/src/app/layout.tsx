// src/app/layout.tsx
import './globals.css';
import ReactQueryProvider from './providers/ReactQueryProvider';

export const metadata = {
  title: 'Crypto Price Tracker',
  description: 'A live cryptocurrency price tracker',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen">
        <ReactQueryProvider>
          <header className="bg-gray-900 border-b border-gray-800 py-4">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-3xl font-bold">Cryptocurrency Dashboard</h1>
              <p className="text-gray-400">Track the latest prices of top cryptocurrencies</p>
            </div>
          </header>
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
          <footer className="bg-gray-900 border-t border-gray-800 py-6">
            <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
              <p>© 2025 CryptoTracker. All rights reserved.</p>
              <p className="mt-2">Data provided by CoinGecko API</p>
            </div>
          </footer>
        </ReactQueryProvider>
      </body>
    </html>
  );
}