import { AuthGuard } from "@/contexts/auth"

export const metadata = {
  title: 'Your profile',
  description: 'An application for image editing and image creation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <AuthGuard>
        {children}
      </AuthGuard>
    </>
  )
}
