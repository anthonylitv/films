import { useContext } from "react"
import "./Recommendation.scss"
import AuthContextMovieDetails from "../../AuthContextMovieDetails"
import MovieItem from "../Movies/MovieItem"
import AuthContext from "../../AuthContext"

const Recommendation = (props) => {
    const context = useContext(AuthContext)
    const contextMovieDetails = useContext(AuthContextMovieDetails)

    const katalog =
        contextMovieDetails.recommendations &&
        contextMovieDetails.recommendations.map((movie) => (
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
                    JSON.parse(localStorage.getItem("addedItems")).find(
                        (item) => item.id === movie.id
                    ) && true
                }
            />
        ))
    return (
        <div className="movie-details__recommendations">
            <h1 className="movie-details__recommendations-title">
                {contextMovieDetails.recommendations &&
                    (contextMovieDetails.recommendations.length > 0
                        ? "Рекомендації до цього фільму"
                        : "До цього фільму немає рекомендацій")}
            </h1>
            {katalog}
        </div>
    )
}

export default Recommendation
