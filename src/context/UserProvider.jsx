import { createContext, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'

export const UserContext = createContext()

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(false)

    useEffect(() => {
        const isUserOnline = onAuthStateChanged(auth, user => {
            if (user) {
                const { email, photoURL, displayName, uid } = user
                setUser({ email, photoURL, displayName, uid })
                // console.log(user)
            } else setUser(null)
        })

        return () => isUserOnline()
    }, [])

    const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password)
    const login = (email, password) => signInWithEmailAndPassword(auth, email, password)
    const logout = () => signOut(auth)

    return (
        <UserContext.Provider value={{ user, setUser, createUser, login, logout }}>
            { children }
        </UserContext.Provider>
    )
}

export default UserProvider
