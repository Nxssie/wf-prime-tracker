import './globals.css'
import {Inter} from 'next/font/google'
import {Providers} from "@/app/providers";

const inter = Inter({subsets: ['latin']})

export const metadata = {
    title: 'Warframe Prime Tracker',
    description: 'Developed by Nxssie',
}

export default async function RootLayout({children}) {
    return (
        <html lang="en" className="dark">
        <head>
            <link rel="icon" href="/logo.svg" sizes="any"/>
        </head>
        <body>
            <Providers>{children}</Providers>

        </body>
        </html>
    );
}
