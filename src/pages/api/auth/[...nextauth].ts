import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { signIn } from "next-auth/react"
import { userInfo } from "os"

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    })
  ],
  callbacks: {
      async signIn({ user, account, profile, email, credentials }) {
        return true
      },
      async session({ session, token, user }) {
        // Send properties to the client, like an access_token from a provider.
        session.accessToken = token.accessToken
        try {
          return {
            ...session,
            id: token.sub
          }
        }
        catch {
          return {
            ...session,
            id: null
          }
        }
      }
  //   async session ({session, user}) {
  //     try {
  //       return {
  //         ...session,
  //         id: user.id
  //       }
  //     }
  //     catch {
  //       return {
  //         ...session,
  //         id: null
  //       }
  //     }
  //   },
  //   async signIn({user, account, profile}) {
  //     try {
  //       return true
  //     }
  //     catch (err)
  //     {
  //       console.log('Error', err)
  //       return false
  //     }
  //   }
   }
})