import { Outlet, useParams } from 'react-router-dom'
import { useFirestore } from '../../hooks/useFirestore'
import { useEffect, useState } from 'react'
import Title from '../Title'

const LayoutRedirect = () => {
    const { nanoid } = useParams()
    const { searchData } = useFirestore()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        searchData(nanoid)
            .then(docSnap => {
                if (docSnap.exists()) window.location.href = docSnap.data().origin
                else setLoading(false)
            })
    }, [])

    if (loading) return (<Title text="Cargando..." />)

    return (
        <div className="max-w-screen-xl mx-auto px-4">
            <Outlet />
        </div>
    )
}

export default LayoutRedirect
