import './globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'RudeGPT | A rude GPT-3 demo, powered by OpenAI, Next.js, and AWS Amplify.',
  description: 'A rude GPT-3 demo, powered by OpenAI, Next.js, and AWS Amplify.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        {children}
      </body>
    </html>
  )
}
