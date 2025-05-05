import { collection, getDocs, setDoc, deleteDoc, updateDoc, query, where, doc } from 'firebase/firestore'
import { /*useEffect,*/ useState } from 'react'
import { auth, db } from '../firebase'
import { nanoid } from 'nanoid'

export const useFirestore = () => {
    const [data, setData] = useState([])
    const [error, setError] = useState()
    const [loading, setLoading] = useState({})

    // useEffect(() => {
    //     console.log('getData()')
    //     getData()
    // }, [])

    const getData = async () => {
        try {
            setLoading(preview => ({ ...preview, getData: true }))
            // const querySnapshot = await getDocs(collection(db, 'urls'))

            // querySnapshot.forEach((value, index, array) => {
            //     console.log(value)
            // })

            const dataRef = collection(db, 'urls')
            const q = query(dataRef, where('uid', '==', auth.currentUser.uid))
            const querySnapshot = await getDocs(q)
            
            const dataDb = querySnapshot.docs.map(d => ({ id: d.id, ...d.data() }))
            setData(dataDb)
        } catch (error) {
            console.log(error)
            setError(error.message)
        } finally {
            setLoading(preview => ({ ...preview, getData: false }))
        }
    }

    const addData = async (url) => {
        try {
            setLoading(preview => ({ ...preview, addData: true }))

            const newDoc = {
                origin: url,
                active: true,
                nanoid: nanoid(6),
                uid: auth.currentUser.uid
            }

            await setDoc(doc(db, 'urls', newDoc.nanoid), newDoc)

            setData([...data, newDoc])
        } catch (error) {
            console.log(error)
            setError(error.message)
        } finally {
            setLoading(preview => ({ ...preview, addData: false }))
        }
    }

    const deleteData = async (nanoid) => {
        try {
            setLoading(preview => ({ ...preview, [nanoid]: true }))
            
            await deleteDoc(doc(db, 'urls', nanoid))

            setData([...data.filter(d => d.nanoid !== nanoid)])
        } catch (error) {
            console.log(error)
            setError(error.message)
        } finally {
            setLoading(preview => ({ ...preview, [nanoid]: false }))
        }
    }

    const updateData = async (nanoid, newOrigin) => {
        try {
            setLoading(preview => ({ ...preview, updateData: true }))

            const urlRef = doc(db, 'urls', nanoid)

            await updateDoc(urlRef, { origin: newOrigin })

            setData(data.map(i => i.nanoid === nanoid ? ({ ...i, origin: newOrigin }) : i))
        } catch (error) {
            console.log(error)
            setError(error.message)
        } finally {
            setLoading(preview => ({ ...preview, updateData: false }))
        }
    }

    return { data, error, loading, getData, addData, deleteData, updateData }
}
