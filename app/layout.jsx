import localFont from 'next/font/local'
import './globals.css'
import { ThemeProvider } from '../components/ThemeContext'
import Background from '../components/Background'

// Fonts come from the wxdu.org repo (MIT licensed): kallisto is the display
// serif, Courier Prime the monospace body — the same pairing that gives
// wxdu.org its voice.
const kallisto = localFont({
  src: '../fonts/kallisto.otf',
  display: 'swap',
  variable: '--font-kallisto',
  weight: '400',
})

const courier = localFont({
  src: [
    { path: '../fonts/CourierPrime-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../fonts/CourierPrime-Italic.ttf', weight: '400', style: 'italic' },
    { path: '../fonts/CourierPrime-Bold.ttf', weight: '700', style: 'normal' },
    { path: '../fonts/CourierPrime-BoldItalic.ttf', weight: '700', style: 'italic' },
  ],
  display: 'swap',
  variable: '--font-courier',
})

export const metadata = {
  title: 'Friendly Technologies — Data Engineering & Analytics Consulting',
  description:
    'Friendly Technologies, LLC is a data engineering and analytics consulting studio in Durham, NC. We help organizations apply machine learning efficiently, modernize data architecture, and ship end-to-end data products.',
  keywords: [
    'data engineering',
    'data consulting',
    'ELT pipelines',
    'machine learning',
    'data governance',
    'Durham NC',
    'Friendly Technologies',
  ],
  openGraph: {
    title: 'Friendly Technologies — Data, Made Friendly',
    description:
      'Data engineering & analytics consulting in Durham, NC. Modern data architecture, practical machine learning, end-to-end data products.',
    type: 'website',
    url: 'https://friendlytechnologies.net/',
  },
}

// Sets the saved theme on <html> before first paint so there's no flash of
// the wrong colors. Runs standalone (no imports) so it's as cheap as possible.
const themeBootstrap = `
(function () {
  try {
    var t = localStorage.getItem('ft-theme');
    var ok = ['teal', 'violet', 'orange'].indexOf(t) > -1;
    document.documentElement.setAttribute('data-theme', ok ? t : 'teal');
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'teal');
  }
})();
`

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="teal" className={`${kallisto.variable} ${courier.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body>
        <ThemeProvider>
          <Background />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}