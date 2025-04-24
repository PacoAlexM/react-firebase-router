import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserProvider'
import { useForm } from 'react-hook-form'

const Signin = () => {
    // const [email, setEmail] = useState('tester@mail.com')
    // const [password, setPassword] = useState('123456')

    const navegate = useNavigate()
    const { createUser } = useContext(UserContext)
    const { register, handleSubmit, formState: { errors }, getValues, setError } = useForm({
        defaultValues: {
            email: 'tester@mail.com',
            password: '123456',
            repassword: '123456'
        }
    })

    const onSubmit = async ({ email, password }) => {
        try {
            await createUser(email, password)
            navegate('/')
        } catch (error) {
            const { code } = error
            console.log(code)

            if (code === 'auth/email-already-in-use') return setError('email', { message: 'This email is already in use' }) // alert('This email is already in use')
            if (code === 'auth/invalid-email') return setError('email', { message: 'This is an invalid email' }) // alert('This is an invalid email')
            if (code === 'auth/weak-password') return setError('password', { message: 'Password must be at least 6 characters' }) // alert('Password must be at least 6 characters')
        }
    }

    // const handleOnSubmit = async e => {
    //     e.preventDefault()
    //     
    //     try {
    //         await createUser(email, password)
    //         // console.log('User created')
    //         navigate('/')
    //     } catch (error) {
    //         const { code } = error
    //         console.log(code)
    // 
    //         if (code === 'auth/email-already-in-use') return alert('This email is already in use')
    //         if (code === 'auth/invalid-email') return alert('This is an invalid email')
    //         if (code === 'auth/weak-password') return alert('Password must be at least 6 characters')
    //     }
    // }

    return (
        <>
            <h1>Signin</h1>
            <form onSubmit={ handleSubmit(onSubmit) }>
                <input type="email" placeholder="address@mail.com"
                {
                    ...register('email', {
                        required: {
                            value: true,
                            message: 'This field is required'
                        },
                        pattern: {
                            value: /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
                            message: 'This is an invalid email'
                        }
                    })
                }
                />
                { errors.email && <p>{ errors.email.message }</p> }
                <input type="password" placeholder="Type your password"
                {
                    ...register('password', {
                        required: {
                            value: true,
                            message: 'This field is required'
                        },
                        minLength: {
                            value: 6,
                            message: 'Your password must be at least 6 characters'
                        },
                        validate: {
                            trim: v => !v.trim() ? 'This field is required' : true
                        }
                    })
                }
                />
                { errors.password && <p>{ errors.password.message }</p> }
                <input type="password" placeholder="Confirm your password"
                {
                    ...register('repassword', {
                        required: {
                            value: true,
                            message: 'This field is required'
                        },
                        validate: {
                            trim: v => !v.trim() ? 'This field is required' : true,
                            equals: v => v === getValues('password') || 'The password doesn\'t match'
                        }
                    })
                }
                />
                { errors.repassword && <p>{ errors.repassword.message }</p> }
                <button type="submit">Signin</button>
            </form>
        </>
    )
}

export default Signin