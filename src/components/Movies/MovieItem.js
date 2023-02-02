import "./MovieItem.scss"
import { useNavigate } from "react-router-dom"
import Vote from "./Vote"
import Add from "./Add"

const MovieItem = (props) => {
    const navigate = useNavigate()

    return (
        <div
            className={`movie-container__movie${props.darkTema ? " dark" : ""}`}
            onClick={(event) => {
                if (!event.target.hasAttribute("data-add")) {
                    navigate(
                        `/movie-details/${props.id}-${props.title.replaceAll(
                            " ",
                            "_"
                        )}`
                    )
                }
            }}
        >
            <div className="movie-container__movie-img">
                <img
                    src={`https://image.tmdb.org/t/p/original${props.poster_path}`}
                    alt="Картинка фильма"
                />
                <div className="movie-container__movie-over"></div>
                <Add
                    korzinaHandler={() => props.korzinaHandler(props)}
                    isAdd={props.isAdd}
                />
            </div>
            <div className="movie-container__movie-content">
                <h1 className="movie-content__title">{props.title}</h1>
                <Vote vote={props.vote_average} />
                <div className="movie-content__genres">{props.genre_ids}</div>
            </div>
        </div>
    )
}

export default MovieItem
