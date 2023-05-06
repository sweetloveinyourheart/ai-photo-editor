import AuthProvider from '@/contexts/auth'
import './globals.scss'

export const metadata = {
  title: 'AI Image Generator',
  description: 'An application for image editing and image creation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
