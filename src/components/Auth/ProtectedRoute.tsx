import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react'
import { fireAuthContext } from '../../store/auth/fireAuthContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useContext(fireAuthContext);
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