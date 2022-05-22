import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import {database} from '../../../services/firebaseConnection'
import { collection, getDoc, doc } from 'firebase/firestore'



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
          // Checking if user is a sponsor (vip)
          const docRef = doc(database, "users", String(token.sub))
          const lastDonate = await getDoc(docRef)
          .then((snapshot) => {
            // Setting lastDonate var to show in "board" page
            if (snapshot.exists) {
              return snapshot.data().lastDonate.toDate()
            }
            else {
              return null;
            }
            
          })

          return {
            ...session,
            id: token.sub,
            vip: lastDonate ? true : false,
            lastDonate: lastDonate
          }
          
        }
        // triggered when user is not a sponsor
        catch {
          return {
            ...session,
            id: token.sub,
            vip: false,
            lastDonate: null
          }
        }
      }
   },
   secret: process.env.SECRET
})