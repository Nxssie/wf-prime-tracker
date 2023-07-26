import './globals.css'
import { Inter } from 'next/font/google'
import { AuthProvider } from '@/components/authProvider';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Warframe Prime Tracker',
  description: 'Developed by Nxssie',
}

export default async function RootLayout({ children }) {
  return (
      <html lang="en">
      <head>
          <link rel="icon" href="/logo.svg" sizes="any" />
      </head>
      <body>
      <div>
        <main className="flex w-full flex-1 shrink-0 flex-col items-center justify-center px-8 text-center sm:px-20">
          <AuthProvider>{children}</AuthProvider>
        </main>
      </div>
      </body>
      </html>
  );
}
