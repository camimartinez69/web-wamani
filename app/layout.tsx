import type { Metadata, Viewport } from 'next'
import { Inter, DM_Serif_Display } from 'next/font/google'
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
  title: 'Wamani | Experiencia de campo en Mendoza',
  description:
    'Viví una experiencia única en el Valle de Uco, Mendoza. Naturaleza, montaña y desconexión total en Wamani.',

  keywords: [
    'Wamani',
    'Mendoza',
    'Valle de Uco',
    'Argentina',
    'turismo',
    'campo',
    'montaña',
    'experiencia',
    'naturaleza',
  ],

  authors: [{ name: 'Wamani' }],

  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },

  openGraph: {
    title: 'Wamani | Experiencia de campo en Mendoza',
    description:
      'Viví una experiencia única en el Valle de Uco, Mendoza. Naturaleza, montaña y desconexión total en Wamani.',
    type: 'website',
    locale: 'es_AR',
    url: 'https://wamani.net',
    siteName: 'Wamani',
  },
}

export const viewport: Viewport = {
  themeColor: '#E5D9C3',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
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