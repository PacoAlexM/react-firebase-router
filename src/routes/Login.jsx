import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserProvider'

const Login = () => {
    const { user, setUser } = useContext(UserContext)
    const navigate = useNavigate()

    const handleClickLogin = () => {
        setUser(true)
        navigate('/')
    }

    return (
        <>
            <h1>Login</h1>
            <h2>{ user ? 'Online' : 'Offline' }</h2>
            { !user && <button onClick={ handleClickLogin }>Signin</button> }
        </>
    )
}

export default Login
