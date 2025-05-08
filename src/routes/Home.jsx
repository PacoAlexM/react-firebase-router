import Title from '../components/Title'
import { useFirestore } from '../hooks/useFirestore'
import { useEffect, useState } from 'react'
import Button from '../components/Button'
import { formValidate } from '../utils/formValidate'
import { useForm } from 'react-hook-form'
import InputForm from '../components/InputForm'
import InputError from '../components/InputError'
import { firebaseErrors } from '../utils/firebaseError'

const Home = () => {
    const { data, error, loading, getData, addData, deleteData, updateData } = useFirestore()
    // const [url, setUrl] = useState('')
    const [nanoid, setNanoid] = useState('')
    const [copying, setCopying] = useState({})
    const [copied, setCopied] = useState({})
    const { required, patternUrl } = formValidate()

    const { register, handleSubmit, setValue, resetField, formState: { errors }, setError } = useForm()

    useEffect(() => {
        console.log('getData()')
        getData()
    }, [])

    if (loading.getData) return <p>Loading data...</p>
    if (error) return <p>{ error }</p>

    const handleFormSubmit = async ({ url }) => {
        // console.log(url)

        try {
            if (nanoid)
                await updateData(nanoid, url)
            else
                await addData(url)

            setNanoid('')
            resetField('url')
        } catch (error) {
            const { code, message } = firebaseErrors(error.code)
            console.log(error.code)

            setError(code, { message })
        }
    }

    const handleDelete = nanoid => {
        // console.log(nanoid)
        deleteData(nanoid)
    }

    const handleUpdate = ({ nanoid, origin }) => {
        // console.log(nanoid)
        setNanoid(nanoid)
        setValue('url', origin)
    }

    const handleCancel = () => {
        setNanoid('')
        resetField('url')
    }

    const handleCopy = async nanoid => {
        setCopying({ [nanoid]: true })
        setCopied({ [nanoid]: false })
        await navigator.clipboard.writeText(`${window.location.href}${nanoid}`)
        setCopying({ [nanoid]: false })
        setCopied({ [nanoid]: true })
    }

    return (
        <>
            <Title text="Home" />
            <form onSubmit={ handleSubmit(handleFormSubmit) }>
                <InputForm type="text" placeholder="Example: https://github.com/MyUserName" label="Url" id="url" error={ errors.url }
                {
                    ...register('url', {
                        required,
                        pattern: patternUrl
                    })
                }
                >
                    <InputError error={ errors.url } />
                </InputForm>
                {/*<input type="text" value={ url } onChange={ e => setUrl(e.target.value) } placeholder="Example: https://github.com/MyUserName" />*/}
                {
                    nanoid ? <Button type="submit" text="Edit Url" color="yellow" isLoading={ loading.updateData } loadingText="Saving" /> : <Button type="submit" text="Add Url" isLoading={ loading.addData } loadingText="Saving" />
                }
                {
                    nanoid && <Button type="button" text="Cancel" color="red" onClick={ handleCancel } />
                }
            </form>
            {
                data.map(i => (
                    <div key={ i.id } className="mb-3 p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{ i.nanoid }</h5>
                        <p className="mb-3 font-normal text-gray-700">{ i.origin }</p>
                        <div className="flex justify-between">
                            <Button type="button" text="Delete" color="red" isLoading={ loading[i.nanoid] } loadingText="Deleting" onClick={ () => handleDelete(i.nanoid) } />
                            <Button type="button" text="Change url" color="green" onClick={ () => handleUpdate(i) } />
                            <Button type="button" text={ copied[i.nanoid] ? 'Copied' : 'Copy' } isLoading={ copying[i.nanoid] } loadingText="Copying" onClick={ () => handleCopy(i.nanoid) } />
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default Home
