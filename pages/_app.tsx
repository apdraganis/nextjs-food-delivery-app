import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import CartProvider from '../src/store/cart/CartProvider'
import Layout from '../src/components/Layout/Layout'
import FireAuthProvider from '../src/store/auth/fireAuthContext'
import { useRouter } from 'next/router'
import ProtectedRoute from '../src/components/Auth/ProtectedRoute'
import { Provider } from 'react-redux'
import reduxStore from '../src/store/redux/index'

const noAuthRequired = ['/', '/products', '/auth'];

function MyApp({ Component, pageProps }: AppProps) {

  const router = useRouter();

  return (
    <FireAuthProvider>
      <CartProvider>
        <Provider store={reduxStore}>
          <Layout>
            {noAuthRequired.includes(router.pathname) ? (
              <Component {...pageProps} />
            ) : (
              <ProtectedRoute>
                <Component {...pageProps} />
              </ProtectedRoute>
            )}
          </Layout>
        </Provider>
      </CartProvider>
    </FireAuthProvider>
  )
}

export default MyApp
