import { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserProvider'

const Navbar = () => {
    const { user, setUser } = useContext(UserContext)
    const navigate = useNavigate()

    const handleClickLogout = () => {
        setUser(false)
        navigate('/login')
    }

    return (
        <div>
            {
                user ? (
                    <>
                        <NavLink to="/">Home</NavLink>
                        <button onClick={ handleClickLogout }>Logout</button>
                    </>
                ) : (<NavLink to="/login">Login</NavLink>) }
        </div>
    )
}

export default Navbar
