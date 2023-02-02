import AuthContextSearchPage from "../AuthContextSearchPage"
import AuthContext from "../AuthContext"
import { useContext } from "react"
import Loader from "./Loader"
import Pages from "./Pages/Pages"
import { useLocation } from "react-router-dom"
import { useState } from "react"
import { useEffect } from "react"

const ObertkaMovies = (props) => {
    const context = useContext(AuthContext)
    const contextSearchPage = useContext(AuthContextSearchPage)
    const location = useLocation()
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setLoader(false)
        }, 900)
    }, [])

    return (
        <>
            <section
                className={`movie-container${context.darkTema ? " dark" : ""}`}
            >
                {(context.isLoader || loader) && <Loader />}
                <div className="container">
                    {props.items.length > 0 ? (
                        props.items
                    ) : (
                        <div className="movie__null">
                            По этому запросу ничего не найдено
                        </div>
                    )}
                </div>

                {(!location.pathname.includes("my-movies") &&
                    !location.pathname.includes("search")) ||
                (location.pathname.includes("search") &&
                    contextSearchPage.katalogSearchPage.length > 0) ? (
                    <Pages
                        darkTema={context.darkTema}
                        changePage={props.changePage}
                        choosePage={props.choosePage}
                        page={props.page}
                        totalPages={props.totalPages}
                    />
                ) : (
                    ""
                )}
            </section>
        </>
    )
}

export default ObertkaMovies
