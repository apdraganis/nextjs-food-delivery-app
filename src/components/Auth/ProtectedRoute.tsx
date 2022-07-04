import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../store/auth/AuthProvider';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace('/auth')
    }

  }, [router, user])

  return (
    <>
      {user ? children : null}
    </>
  )
}

export default ProtectedRoute;