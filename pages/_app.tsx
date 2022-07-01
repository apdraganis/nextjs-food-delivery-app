import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import CartProvider from '../src/store/cart/CartProvider'
import AuthProvider from '../src/store/auth/AuthProvider'
import Layout from '../src/components/Layout/Layout'
import FireAuthProvider from '../src/store/auth/fireAuthContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FireAuthProvider>
      <AuthProvider>
        <CartProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CartProvider>
      </AuthProvider>
    </FireAuthProvider>
  )
}

export default MyApp
