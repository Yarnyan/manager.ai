import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
type Props = {
    children: React.ReactNode
}

export default function ProtectedRouter({ children }: Props) {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    useEffect(() => {
        if (!token) {
            navigate('/')
        }
    }, [token, navigate])

    return (
        children
    )
}