import { Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useFirebase } from './Firebase'
import React, { ReactNode, useEffect } from 'react'

interface ProtectedRouteProps {
  children: ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const currentUser = useFirebase()?.currentUser
  let location = useLocation()
  let navigate = useNavigate()

  useEffect(() => {
    if (!currentUser) {
      navigate('/login', { state: { from: location.pathname } })
    } else if (!React.isValidElement(children)) {
      navigate('/404', { replace: true })
    }
  }, [currentUser, navigate, children, location.pathname])

  return React.isValidElement(children) ? children : null
}

export default ProtectedRoute