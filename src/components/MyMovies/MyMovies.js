import { useContext } from "react"
import AuthContext from "../../AuthContext"
import MovieItem from "../Movies/MovieItem"

const MyMovies = (props) => {
    const context = useContext(AuthContext)
    const addedItemsKatalog = props.addedItemsLS.map((movie) => (
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
            isAdd={movie.isAdd}
        />
    ))
    return (
        <div className={`movie-container${context.darkTema ? " dark" : ""}`}>
            <div className="container">
                {JSON.parse(localStorage.getItem("addedItems")).length !== 0 ? (
                    addedItemsKatalog
                ) : (
                    <div className="movie__null">
                        Пока что у вас нет добавленных фильмов
                    </div>
                )}
            </div>
        </div>
    )
}

export default MyMovies
