// To give type for objects
import {AppProps} from 'next/app';
import {Header} from '../components/Header';
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
// Global CSS
import '../style/global.scss';
import {SessionProvider as NextAuthProvider} from 'next-auth/react'

const initialOptions = {
  'client-id': 'AdSpiqQXSeI3eaY0PRp08hCA5IdkkptuoueizI3m-Yv7FLh_3g9PfGHLqafyKFelyxrVF7i2vCPBlXxN',
  currency: 'BRL',
  intent: 'capture'
}
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <PayPalScriptProvider options={initialOptions}>
        <Header/>
        <Component {...pageProps} />
      </PayPalScriptProvider>
    </NextAuthProvider>
  )
}

export default MyApp
