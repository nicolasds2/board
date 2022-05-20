// To give type for objects
import {AppProps} from 'next/app';
import {Header} from '../components/Header';
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
// Global CSS
import '../style/global.scss';
import {SessionProvider as NextAuthProvider} from 'next-auth/react'

const initialOptions = {
  'client-id': 'AWGuNM2C6uuEPtXv6AXoH1xXLbYODsgCJDY21w_4K3SUDLD9LO5XXm39PH1YvM3oH8r_2gyILI8wkV5N',
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
