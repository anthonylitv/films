import ObertkaMovies from "../ObertkaMovies"
import { useContext } from "react"
import MovieItem from "../Movies/MovieItem"
import AuthContextSearchPage from "../../AuthContextSearchPage"
import AuthContextPagination from "../../AuthContextPagination"
import AuthContext from "../../AuthContext"
import { useLocation } from "react-router-dom"

const SearchPage = (props) => {
    const location = useLocation()
    const context = useContext(AuthContext)
    const contextSearchPage = useContext(AuthContextSearchPage)
    const contextPagination = useContext(AuthContextPagination)

    const katalogSearchPage = contextSearchPage.katalogSearchPage.map(
        (movie) => (
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
                    props.addedItemsLS.find((item) => item.id === movie.id) &&
                    true
                }
            />
        )
    )
    return (
        <ObertkaMovies
            items={katalogSearchPage}
            page={
                !location.pathname.includes("page")
                    ? 1
                    : parseInt(contextSearchPage.locationPathnameArr)
            }
            totalPages={contextSearchPage.totalPagesSearchPage}
            changePage={(change, pageid) =>
                contextPagination.changePageHandler(change, pageid, "search")
            }
            choosePage={(id) =>
                contextPagination.choosePageHandler(id, "search")
            }
        />
    )
}

export default SearchPage
