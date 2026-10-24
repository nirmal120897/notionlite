import { useAuth } from "@/context/Authcontext"
import { Navigate } from "react-router-dom"

export const ProtectedRoute = ({ children }) => {
    const { user } = useAuth()
    const token = localStorage.getItem("token")
    console.log(">>>>user", user);
    console.log(">>>>token", token);
    if (!user || !token) {
        return <Navigate to="/login" replace />
    }

    return children
}