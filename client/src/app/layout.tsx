import AuthProvider from '@/contexts/auth'
import './globals.scss'
import MessageProvider from '@/contexts/message'
import Provider from './provider'

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
        <Provider>
          <AuthProvider>
            <MessageProvider>
              {children}
            </MessageProvider>
          </AuthProvider>
        </Provider>
      </body>
    </html>
  )
}
