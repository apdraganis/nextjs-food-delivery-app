import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import CartProvider from '../src/store/cart/CartProvider'
import AuthProvider from '../src/store/auth/AuthProvider'
import Layout from '../src/components/Layout/Layout'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <CartProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CartProvider>
    </AuthProvider>
  )
}

export default MyApp
