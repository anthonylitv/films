import "./AuthorizationModal.scss"
import { useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { setIsModalAuth } from "../reducers/userReducer"

const AuthorizationModal = (props) => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")

    const over1 = useRef(null)
    const over2 = useRef(null)

    const disableModalHandler = (event) => {
        if (event.target === over1.current || event.target === over2.current) {
            dispatch(setIsModalAuth(false))
        }
    }

    const formSendHandler = (event) => {
        event.preventDefault()
    }

    const emailChangeHandler = (event) => {
        setEmail(event.target.value)
    }

    const passChangeHandler = (event) => {
        setPass(event.target.value)
    }

    return (
        <div onClick={disableModalHandler} className="modalAuth" ref={over1}>
            <div className="contentAuth">
                <div ref={over2} className="closedAuth">
                    &#215;
                </div>

                <form onSubmit={formSendHandler}>
                    <h1 className="zagAuth">Вхід</h1>
                    <input
                        value={email}
                        onChange={emailChangeHandler}
                        placeholder="Email"
                        type="text"
                        className="email"
                    />
                    <input
                        value={pass}
                        onChange={passChangeHandler}
                        placeholder="Пароль"
                        type="password"
                        className="email"
                    />
                    <button
                        onClick={() => props.userLogin(email, pass)}
                        className="loginAuth"
                    >
                        Увійти
                    </button>
                    <span className="registred">Зареєструватись</span>
                </form>
            </div>
        </div>
    )
}

export default AuthorizationModal
