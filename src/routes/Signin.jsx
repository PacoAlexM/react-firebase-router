import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserProvider'
import { useForm } from 'react-hook-form'
import { firebaseErrors } from '../utils/firebaseError'
import { formValidate } from '../utils/formValidate'
import InputError from '../components/InputError'
import InputForm from '../components/InputForm'
import Title from '../components/Title'
import Button from '../components/Button'

const Signin = () => {
    // const [email, setEmail] = useState('tester@mail.com')
    // const [password, setPassword] = useState('123456')

    const [loading, setLoading] = useState(false)

    const navegate = useNavigate()
    const { createUser } = useContext(UserContext)
    const { register, handleSubmit, formState: { errors }, getValues, setError } = useForm({
        defaultValues: {
            email: 'tester@mail.com',
            password: '123456',
            repassword: '123456'
        }
    })

    const { required, patternEmail, minLength, validateTrim, validateEquals } = formValidate()
    
    const onSubmit = async ({ email, password }) => {
        try {
            setLoading(true)
            await createUser(email, password)
            navegate('/')
        } catch (error) {
            // const { code } = error
            const { code, message } = firebaseErrors(error.code)
            console.log(error.code)

            // if (code === 'auth/email-already-in-use') return setError('email', { message: 'This email is already in use' }) // alert('This email is already in use')
            // if (code === 'auth/invalid-email') return setError('email', { message: 'This is an invalid email' }) // alert('This is an invalid email')
            // if (code === 'auth/weak-password') return setError('password', { message: 'Password must be at least 6 characters' }) // alert('Password must be at least 6 characters')

            setError(code, { message })
        } finally {
            setLoading(false)
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
            <Title text="Signin" />
            {/* errors.firebase && <p>{ errors.firebase.message }</p> */}
            <form onSubmit={ handleSubmit(onSubmit) }>
                <InputForm type="email" placeholder="address@mail.com" label="Email" id="email" error={ errors.email }
                {
                    ...register('email', {
                        required,
                        pattern: patternEmail
                    })
                }
                >
                    <InputError error={ errors.email } />
                </InputForm>
                <InputForm type="password" placeholder="Type your password" label="Password" id="password" error={ errors.password }
                {
                    ...register('password', {
                        required,
                        minLength,
                        validate: validateTrim
                    })
                }
                >
                    <InputError error={ errors.password } />
                </InputForm>
                <InputForm type="password" label="Confirm your password" id="repassword" error={ errors.repassword }
                {
                    ...register('repassword', {
                        required: {
                            value: true,
                            message: 'This field is required'
                        },
                        validate: validateEquals(getValues('password'))
                    })
                }
                >
                    <InputError error={ errors.repassword } />
                </InputForm>
                <Button type="submit" text="Create user" isLoading={ loading } />
            </form>
        </>
    )
}

export default Signin
