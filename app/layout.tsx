import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AddToHomeScreen from './components/AddToHomeScreen'
import ServiceWorkerRegistration from './components/ServiceWorkerRegistration'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Open Food Maps',
  description: 'A food mapping application for university campuses',
  manifest: '/manifest.json',
  themeColor: '#046E00',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Food Maps',
  },
  icons: {
    apple: '/icons/icon-192x192.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="theme-light">
      <body className={inter.className}>
        {children}
        <AddToHomeScreen />
        <ServiceWorkerRegistration />
      </body>
    </html>
  )
}
