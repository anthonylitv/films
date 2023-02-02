import "./MovieContainer.scss"
import MovieItem from "./MovieItem"
import { useContext, useEffect, useState } from "react"
import AuthContext from "../../AuthContext"
import ObertkaMovies from "../ObertkaMovies"
import Kategories from "../Kategories"
import AuthContextPagination from "../../AuthContextPagination"
import { useLocation } from "react-router-dom"

const MovieContainer = (props) => {
    const context = useContext(AuthContext)
    const contextPagination = useContext(AuthContextPagination)
    const location = useLocation()
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setLoader(false)
        }, 900)
    }, [])

    const katalog = context.katalog.map((movie) => (
        <MovieItem
            darkTema={context.darkTema}
            key={movie.id}
            id={movie.id}
            poster_path={movie.poster_path}
            backdrop_path={movie.backdrop_path}
            title={movie.title}
            overview={movie.overview}
            vote_average={movie.vote_average}
            genre_ids={movie.genre_ids}
            korzinaHandler={props.korzinaHandler}
            isAdd={
                props.addedItemsLS.find((item) => item.id === movie.id) && true
            }
        />
    ))

    return (
        <>
            {!context.isLoader && !loader && <Kategories />}
            <ObertkaMovies
                items={katalog}
                page={
                    !location.pathname.includes("page")
                        ? 1
                        : parseInt(context.locationPathnameArr)
                }
                totalPages={context.totalPages}
                changePage={(change, pageid) =>
                    contextPagination.changePageHandler(change, pageid, "main")
                }
                choosePage={(id) =>
                    contextPagination.choosePageHandler(id, "main")
                }
            />
        </>
    )
}

export default MovieContainer
