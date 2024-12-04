import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider'

export const ProtetedRoute = () => {
    const auth = useAuth()

    return auth.isAuthenticated ? <Outlet /> : <Navigate to={'/'} />
}
