import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import CartProvider from '../src/store/cart/CartProvider'
import AuthProvider from '../src/store/auth/AuthProvider'
import Layout from '../src/components/Layout/Layout'
import FireAuthProvider from '../src/store/auth/fireAuthContext'
import { useRouter } from 'next/router'
import ProtectedRoute from '../src/components/Auth/ProtectedRoute'

const noAuthRequired = ['/', '/products', '/auth'];

function MyApp({ Component, pageProps }: AppProps) {

  const router = useRouter();

  return (
    <FireAuthProvider>
      <CartProvider>
        <Layout>
          {noAuthRequired.includes(router.pathname) ? (
            <Component {...pageProps} />
          ) : (
            <ProtectedRoute>
              <Component {...pageProps} />
            </ProtectedRoute>
          )}
        </Layout>
      </CartProvider>
    </FireAuthProvider>
  )
}

export default MyApp
