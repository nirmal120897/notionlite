import { createContext, useContext, useState } from 'react'
import { loginApi, registerApi } from '@/api/auth.api'

const AuthContext = createContext(null)

function readUser() {
    try {
        return JSON.parse(localStorage.getItem('user'))
    } catch {
        return null
    }
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(readUser)

    const login = async (values) => {
        const res = await loginApi(values)
        const { token, user } = res.data
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
        setUser(user)
    }

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
    return ctx
}