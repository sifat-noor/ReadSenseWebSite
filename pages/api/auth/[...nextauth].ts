import NextAuth, { NextAuthOptions }  from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions : NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
        deviceInfo: { label: "Device Info", type: "text" },
        fingerPrint: { label: "Device Info", type: "text" }
      },
      async authorize(credentials, req) {
        const { username, password, deviceInfo, fingerPrint } = credentials as any;
        const url = process.env.NEXT_PUBLIC_READSENSE_API_URL+"/api/Users/authenticate"
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password, deviceInfo, fingerPrint })
        });
        
        const user = await response.json();

        if(response.ok && user) {
          return user;
        } else {
          return null;
        }
      }
    })
  ],

  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const isAllowedToSignIn = true
      if (isAllowedToSignIn) {
        return true
      } else {
        // Return false to display a default error message
        return false
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
    async jwt({ token, user }) {
      if (user) {
        return { ...token, ...user };
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken
      session.user.id = token.id
      session.user.email = token.userName
      session.user.agreementSigned = token.agreementSigned

      return session;
    },
  },
  pages: {
    signIn: "/login",
  }
}

export default NextAuth(authOptions)
