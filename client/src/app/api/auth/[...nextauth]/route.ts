import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

 const authOptions = {
  providers: [
    GoogleProvider({
      clientId: "310888365322-2uor783c9k68k0d3bva6nrcgrrfst9ut.apps.googleusercontent.com",
      clientSecret: "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"
    })
  ]
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
