import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/login.jsx'
import { ProtectedRoute } from './components/Protectedroute.jsx'
import { Toaster } from "@/components/ui/sonner"
import { Dashboard } from './pages/dashboard.jsx'
import { Register } from './pages/signup.jsx'
function App() {

  // return (
  return (
    <>
      <Routes>
        {/* --Auth Route-- */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster />
    </>
  )

}

export default App
