import type { Metadata, Viewport } from 'next'
import { Inter, DM_Serif_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const dmSerif = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-dm-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Wamani | Campo y Montaña en Mendoza',
  description:
    'Una experiencia de campo y montaña en el sudoeste mendocino: espacio, silencio y una forma distinta de habitar el paisaje.',
  keywords: ['Wamani', 'Mendoza', 'Argentina', 'turismo', 'campo', 'montaña', 'aventura', 'naturaleza'],
  authors: [{ name: 'Wamani' }],
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  openGraph: {
    title: 'Wamani | Campo y Montaña en Mendoza',
    description:
      'Una experiencia de campo y montaña en el sudoeste mendocino: espacio, silencio y una forma distinta de habitar el paisaje.',
    type: 'website',
    locale: 'es_AR',
  },
}

export const viewport: Viewport = {
  themeColor: '#E5D9C3',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${inter.variable} ${dmSerif.variable}`}
      data-scroll-behavior="smooth"
    >
      <body suppressHydrationWarning className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}