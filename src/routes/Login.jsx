import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserProvider'

const Login = () => {
    // const { user, setUser } = useContext(UserContext)
    const navigate = useNavigate()

    const { login } = useContext(UserContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // const handleClickLogin = () => {
    //     setUser(true)
    //     navigate('/')
    // }

    const handleOnSubmit = async e => {
        e.preventDefault()
        
        try {
            await login(email, password)
            // console.log('User authenticated')
            navigate('/')
        } catch (error) {
            const { code } = error
            console.log(code)

            if (code === 'auth/invalid-email') return alert('This is an invalid email')
            if (code === 'auth/missing-password') return alert('The password is required')
            if (code === 'auth/invalid-credential') return alert('Invalid user or password')
        }
    }

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={ handleOnSubmit }>
                <input type="email" placeholder="address@mail.com" value={ email } onChange={ e => setEmail(e.target.value) } />
                <input type="password" placeholder="Type your password" value={ password } onChange={ e => setPassword(e.target.value) } />
                <button type="submit">Login</button>
            </form>
        </>
    )
}

export default Login
