import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

 const authOptions = {
  providers: [
    GoogleProvider({
      clientId: "310888365322-v1gpo4fskp6j0fjshbi0gl9obipuo225.apps.googleusercontent.com",
      clientSecret: "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"
    })
  ]
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
