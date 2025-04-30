import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserProvider'
import { useForm } from 'react-hook-form'
import { firebaseErrors } from '../utils/firebaseError'
import InputError from '../components/InputError'
import InputForm from '../components/InputForm'
import { formValidate } from '../utils/formValidate'

const Login = () => {
    const navegate = useNavigate()
    const { login } = useContext(UserContext)
    const { register, handleSubmit, formState: { errors }, setError } = useForm({
        defaultValues: {
            email: 'tester@mail.com',
            password: '123456'
        }
    })
    const { required, patternEmail, minLength, validateTrim } = formValidate()

    const onSubmit = async ({ email, password }) => {
        try {
            await login(email, password)
            navegate('/')
        } catch (error) {
            // const { code } = error
            const { code, message } = firebaseErrors(error.code)
            console.log(error.code)

            setError(code, { message })
        }
    }

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={ handleSubmit(onSubmit) }>
                <InputForm type="email" placeholder="address@mail.com" label="Email" idElement="email"
                {
                    ...register('email', {
                        required,
                        pattern: patternEmail
                    })
                }
                >
                    <InputError error={ errors.email } />
                </InputForm>
                <InputForm type="password" placeholder="Type your password" label="Password" idElement="password"
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
                <button type="submit">Login</button>
            </form>
        </>
    )
}

export default Login
