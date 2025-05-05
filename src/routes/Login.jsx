import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserProvider'
import { useForm } from 'react-hook-form'
import { firebaseErrors } from '../utils/firebaseError'
import InputError from '../components/InputError'
import InputForm from '../components/InputForm'
import { formValidate } from '../utils/formValidate'
import Title from '../components/Title'
import Button from '../components/Button'

const Login = () => {
    const navegate = useNavigate()
    const { login } = useContext(UserContext)
    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, formState: { errors }, setError } = useForm({
        defaultValues: {
            email: 'tester@mail.com',
            password: '123456'
        }
    })
    const { required, patternEmail, minLength, validateTrim } = formValidate()

    const onSubmit = async ({ email, password }) => {
        try {
            setLoading(true)
            await login(email, password)
            navegate('/')
        } catch (error) {
            // const { code } = error
            const { code, message } = firebaseErrors(error.code)
            console.log(error.code)

            setError(code, { message })
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Title text="Login" />
            <form onSubmit={ handleSubmit(onSubmit) }>
                <InputForm type="email" placeholder="address@mail.com" label="Email" idElement="email" error={ errors.email }
                {
                    ...register('email', {
                        required,
                        pattern: patternEmail
                    })
                }
                >
                    <InputError error={ errors.email } />
                </InputForm>
                <InputForm type="password" placeholder="Type your password" label="Password" idElement="password" error={ errors.password }
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
                <Button type="submit" text="Login" isLoading={ loading } />
            </form>
        </>
    )
}

export default Login
