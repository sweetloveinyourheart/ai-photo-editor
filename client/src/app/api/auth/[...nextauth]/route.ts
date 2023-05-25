import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

 const authOptions = {
  providers: [
    GoogleProvider({
      clientId: "310888365322-5giiflk1hc8cd7h6m8rc32t2i2sbma1v.apps.googleusercontent.com",
      clientSecret: "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"
    })
  ],
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
