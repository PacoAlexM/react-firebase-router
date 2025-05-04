import { useContext } from 'react'
import { UserContext } from '../../context/UserProvider'
import { Navigate, Outlet } from 'react-router-dom'

const LayoutRequireAuth = () => {
    const { user } = useContext(UserContext)

    if (!user) return <Navigate to="/login" />

    return (
        <div className="max-w-screen-xl mx-auto px-4">
            <Outlet />
        </div>
    )
}

export default LayoutRequireAuth
