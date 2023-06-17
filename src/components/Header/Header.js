import { useContext } from "react"
import "./Header.scss"
import AuthContext from "../../AuthContext"
import Search from "./Search"
import { Link } from "react-router-dom"
import { useAuth } from "../useAuth"
import { useDispatch } from "react-redux"
import { setIsModalAuth } from "../reducers/userReducer"
import { removeUser } from "../reducers/userReducer"

const Header = (props) => {
    const context = useContext(AuthContext)
    const dispatch = useDispatch()
    const { isAuthorizated } = useAuth()

    return (
        <header className={`header${context.darkTema ? " dark" : ""}`}>
            <div className="container-header">
                <div className="header__left">
                    <a
                        href="/"
                        className="header__logo"
                        onClick={() => {
                            sessionStorage.clear()
                        }}
                    >
                        <span className="span-1">Proj</span>
                        <span className="span-2">Films</span>
                    </a>
                    <Search />
                </div>
                <div className="header__right">
                    <Link
                        to="/my-movies"
                        className={`header__movies${
                            context.isLoader
                                ? " disable"
                                : props.isKorzinaClicked
                                ? " anim"
                                : ""
                        }`}
                        disabled={context.isLoader ? true : false}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                        >
                            <path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zm64 0v64h64V96H64zm384 0H192v64H448V96zM64 224v64h64V224H64zm384 0H192v64H448V224zM64 352v64h64V352H64zm384 0H192v64H448V352z" />
                        </svg>
                        <span>Улюблене</span>
                    </Link>

                    <button
                        className="header__tema"
                        onClick={context.darkTemaHandler}
                        disabled={context.isLoader ? true : false}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            className={`header__svg-tema${
                                context.isLoader ? " disable" : ""
                            }`}
                        >
                            <path d="M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 64V448C362 448 448 362 448 256C448 149.1 362 64 256 64z" />
                        </svg>
                    </button>

                    {isAuthorizated ? (
                        <div
                            onClick={() => {
                                dispatch(removeUser())
                                window.location.reload()
                            }}
                            className="exit"
                        >
                            Вийти
                        </div>
                    ) : (
                        <div
                            onClick={() => {
                                dispatch(setIsModalAuth(true))
                            }}
                            className="exit"
                        >
                            Увійти
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header
