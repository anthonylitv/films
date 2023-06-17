import { useNavigate } from "react-router-dom"
import "./RegistrationPage.scss"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { setUser } from "../reducers/userReducer"

const RegistrationPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")

    const userSignHandler = (email, password) => {
        const auth = getAuth()

        createUserWithEmailAndPassword(auth, email, password)
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
                    "Або такий користувач вже є, або помилка при введенні даних"
                )
                throw error
            })
            .then(() => {
                navigate(-1)
            })
    }

    return (
        <div className="setion-registration">
            <h1>Реєстрація</h1>
            <input
                type="text"
                placeholder="Email"
                className="inpAuth"
                onChange={(event) => setEmail(event.target.value)}
            />
            <input
                type="text"
                placeholder="password"
                className="inpAuth"
                onChange={(event) => setPass(event.target.value)}
            />
            <button
                onClick={() => userSignHandler(email, pass)}
                className="loginAuth"
            >
                Зареєструватись
            </button>
        </div>
    )
}

export default RegistrationPage
