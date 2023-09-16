import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Chakra } from './chakra'
import { NavHeader } from '@/components/nav-header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'IntrisIQ',
  description: 'Shell Hacks 2023 Project',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} style={{backgroundColor: '#28282B'}}>
        <Chakra>
          {children}
        </Chakra>
      </body>
    </html>
  )
}
