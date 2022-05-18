// To give type for objects
import {AppProps} from 'next/app';
import {Header} from '../components/Header';
// Global CSS
import '../style/global.scss';
import {SessionProvider as NextAuthProvider} from 'next-auth/react'


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <Header/>
      <Component {...pageProps} />
    </NextAuthProvider>
  )
}

export default MyApp
