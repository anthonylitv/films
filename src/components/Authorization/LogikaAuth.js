import { useEffect } from "react"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useDispatch } from "react-redux"
import { setUser } from "../reducers/userReducer"

import AuthorizationModal from "./AuthorizationModal"

const LogikaAuth = () => {
    const dispatch = useDispatch()

    const userLogin = (email, password) => {
        const auth = getAuth()

        signInWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                dispatch(
                    setUser({
                        email: user.email,
                        id: user.uid,
                        token: user.refreshToken,
                    })
                )
            })
            .catch((error) => {
                alert(
                    "Або такого користувача не існує, або помилка при введенні даних"
                )
                throw error
            })
            .then(() => {
                window.location.reload()
            })
    }

    useEffect(() => {
        document.body.style.overflow = "hidden"
        return () => {
            document.body.style.overflow = "auto"
        }
    }, [])

    return <AuthorizationModal userLogin={userLogin} />
}

export default LogikaAuth
