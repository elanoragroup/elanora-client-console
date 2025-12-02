import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import AppLayout from '@/components/layout/AppLayout'
import { NavigationProvider } from '@/contexts/NavigationContext'
import { AuthProvider } from '@/contexts/AuthContext'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'Elanora Client Console',
  description: 'Secure client portal for Elanora Chartered Accountancy',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable}`}>
        <ErrorBoundary>
          <AuthProvider>
            <NavigationProvider>
              <AppLayout>{children}</AppLayout>
            </NavigationProvider>
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}

