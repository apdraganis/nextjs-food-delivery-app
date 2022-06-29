import '../styles/globals.css'
import type { AppProps } from 'next/app'
import CartProvider from '../src/store/cart/CartProvider'
import AuthProvider from '../src/store/auth/AuthProvider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </AuthProvider>
  )
}

export default MyApp
