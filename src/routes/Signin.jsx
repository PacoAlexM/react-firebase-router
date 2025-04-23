import { useContext, useState } from 'react'
import { UserContext } from '../context/UserProvider'

const Signin = () => {
    const [email, setEmail] = useState('tester@mail.com')
    const [password, setPassword] = useState('123456')

    const { createUser } = useContext(UserContext)

    const handleOnSubmit = async e => {
        e.preventDefault()
        
        try {
            await createUser(email, password)
            console.log('User created')
        } catch (error) {
            const { code } = error
            console.log(code)

            if (code === 'auth/email-already-in-use') return alert('This email is already in use')
            if (code === 'auth/invalid-email') return alert('This is an invalid email')
            if (code === 'auth/weak-password') return alert('Password must be at least 6 characters')
        }
    }

    return (
        <>
            <h1>Signin</h1>
            <form onSubmit={ handleOnSubmit }>
                <input type="email" placeholder="address@mail.com" value={ email } onChange={ e => setEmail(e.target.value) } />
                <input type="password" placeholder="Type your password" value={ password } onChange={ e => setPassword(e.target.value) } />
                <button type="submit">Signin</button>
            </form>
        </>
    )
}

export default Signin