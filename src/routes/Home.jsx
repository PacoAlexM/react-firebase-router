import Title from '../components/Title'
import { useFirestore } from '../hooks/useFirestore'
import { useEffect, useState } from 'react'
import Button from '../components/Button'

const Home = () => {
    const { data, error, loading, getData, addData, deleteData, updateData } = useFirestore()
    const [url, setUrl] = useState('')
    const [nanoid, setNanoid] = useState('')

    useEffect(() => {
        console.log('getData()')
        getData()
    }, [])

    if (loading.getData) return <p>Loading data...</p>
    if (error) return <p>{ error }</p>

    const handleSubmit = async e => {
        e.preventDefault()
        // console.log(url)

        if (!url.trim()) return false

        if (nanoid)
            await updateData(nanoid, url)
        else
            await addData(url)
        
        setNanoid('')
        setUrl('')
    }

    const handleDelete = nanoid => {
        // console.log(nanoid)
        deleteData(nanoid)
    }

    const handleUpdate = ({ nanoid, origin }) => {
        // console.log(nanoid)
        setNanoid(nanoid)
        setUrl(origin)
    }

    const handleCancel = () => {
        setNanoid('')
        setUrl('')
    }

    return (
        <>
            <Title text="Home" />
            <form onSubmit={ handleSubmit }>
                <input type="text" value={ url } onChange={ e => setUrl(e.target.value) } placeholder="Example: https://youtbe.com/watch?v=Dhg187hgs" />
                {
                    nanoid ? <Button type="submit" text="Edit Url" color="yellow" isLoading={ loading.updateData } loadingText="Saving" /> : <Button type="submit" text="Add Url" isLoading={ loading.addData } loadingText="Saving" />
                }
                {
                    nanoid && <Button type="button" text="Cancel" color="red" onClick={ handleCancel } />
                }
            </form>
            {
                data.map(i => (
                    <div key={ i.id } className="mb-3">
                        <p>User: { i.uid }</p>
                        <p>Url: { i.origin }</p>
                        <p>Alias: { i.nanoid }</p>
                        <p>Active: { i.active ? 'Yes' : 'No' }</p>
                        <Button type="button" text="Delete" color="red" isLoading={ loading[i.nanoid] } loadingText="Deleting" onClick={ () => handleDelete(i.nanoid) } />
                        <Button type="button" text="Change url" color="yellow" loadingText="Deleting" onClick={ () => handleUpdate(i) } />
                    </div>
                ))
            }
        </>
    )
}

export default Home
