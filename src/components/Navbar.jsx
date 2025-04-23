import { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserProvider'

const Navbar = () => {
    const { user, logout } = useContext(UserContext)
    const navigate = useNavigate()

    const handleOnClick = async () => {
        try {
            await logout()
        } catch (error) {
            const { code } = error

            console.log(code)
        }
    }

    return (
        <div>
            {
                user ? (
                    <>
                        <NavLink to="/">Home | </NavLink>
                        <button type="button" onClick={ handleOnClick }>Logout</button>
                    </>
                ) : (
                    <>
                        <NavLink to="/login">Login | </NavLink>
                        <NavLink to="/signin">Signin</NavLink>
                    </>
                )
            }
        </div>
    )
}

export default Navbar
