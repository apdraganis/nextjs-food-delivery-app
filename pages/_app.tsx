import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Layout from '../src/components/Layout/Layout'
import AuthProvider from '../src/store/auth/AuthProvider'
import { useRouter } from 'next/router'
import ProtectedRoute from '../src/components/Auth/ProtectedRoute'
import { Provider } from 'react-redux'
import reduxStore from '../src/store/redux/index'

const noAuthRequired = ['/', '/products', '/checkout', '/auth'];

function MyApp({ Component, pageProps }: AppProps) {

  const router = useRouter();

  return (
    <AuthProvider>
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
    </AuthProvider>
  )
}

export default MyApp
