import { useContext, useRef, useState } from "react"
import "./Search.scss"
import AuthContextSearchPage from "../../AuthContextSearchPage"
import AuthContext from "../../AuthContext"
import { useLocation, useNavigate } from "react-router-dom"

const Search = () => {
    const context = useContext(AuthContext)
    const contextSearchPage = useContext(AuthContextSearchPage)
    const [izmena, setIzmena] = useState()
    const inp = useRef()
    const location = useLocation()
    const navigate = useNavigate()

    const searchHandler = (event) => {
        event.preventDefault()
        if (
            (inp.current.value.trim().length > 0 &&
                izmena !== inp.current.value) ||
            (!location.pathname.includes("search") &&
                !location.pathname.includes("my-movies") &&
                inp.current.value.trim().length > 0)
        ) {
            contextSearchPage.setSearching(inp.current.value)
            sessionStorage.setItem("search", `&query=${inp.current.value}`)
            sessionStorage.setItem("searchValue", inp.current.value)
            setIzmena(inp.current.value)
            navigate(`/search/${inp.current.value.replaceAll("/", "'")}/page/1`)
        } else if (inp.current.value.trim().length <= 0) {
            inp.current.value = ""
            inp.current.focus()
        }
    }

    return (
        <form
            action=""
            onSubmit={searchHandler}
            className={`search-form${context.darkTema ? " dark" : ""}`}
        >
            <button
                className="search-form__link"
                type="submit"
                title="Поиск"
                disabled={!context.isLoader ? false : true}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className={`search-form__svg${
                        context.isLoader ? " disable" : ""
                    }`}
                >
                    <path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z" />
                </svg>
            </button>
            <input
                defaultValue={sessionStorage.getItem("searchValue")}
                type="text"
                name=""
                id=""
                ref={inp}
                placeholder="Пошук по назві"
            />
        </form>
    )
}

export default Search
