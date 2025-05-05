import { useContext } from 'react'
import { NavLink, /*useNavigate,*/ Link } from 'react-router-dom'
import { UserContext } from '../context/UserProvider'

const Navbar = () => {
    const { user, logout } = useContext(UserContext)
    // const navigate = useNavigate()

    // Buttons
    const btnClassBlue = 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center'
    const btnClassRed = 'text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center'
    const btnClassPurple = 'text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-4 py-2 text-center'

    const handleOnClick = async () => {
        try {
            await logout()
        } catch (error) {
            const { code } = error

            console.log(code)
        }
    }

    return (
        <nav className="bg-white border-gray-200">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse"><span className="self-center text-2xl font-semibold whitespace-nowrap">React Firebase App</span></Link>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    {
                        user ? (
                            <>
                                <NavLink to="/" className={ btnClassBlue }>Home</NavLink>
                                <button type="button" className={ btnClassRed } onClick={ handleOnClick }>Logout</button>
                            </>
                        ) : (
                            <>
                                <NavLink to="/login" className={ btnClassBlue }>Login</NavLink>
                                <NavLink to="/signin" className={ btnClassPurple }>Signin</NavLink>
                            </>
                        )
                    }
                </div>
            </div>
            
        </nav>
    )
}

export default Navbar
