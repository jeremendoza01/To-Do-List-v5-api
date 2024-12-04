import React from 'react'
import { useAuth } from '../auth/AuthProvider'
import { Navigate } from 'react-router-dom'

export const AuthRoute = ({ children }) => {
    const auth = useAuth()

    if (auth.isAuthenticated) {
        return <Navigate to={'/home'} />
    }

    return children
}