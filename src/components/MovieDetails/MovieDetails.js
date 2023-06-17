import "./MovieDetails.scss"
import AuthContextMovieDetails from "../../AuthContextMovieDetails"
import { useContext, useState, useEffect } from "react"
import Vote from "../Movies/Vote"
import Add from "../Movies/Add"
import AuthContext from "../../AuthContext"
import Actors from "./Actors"
import Gallery from "./Gallery"
import Recommendation from "./Recommendation"
import Loader from "../Loader"
import Trailer from "./Trailer"
import Rates from "./Rates"
import Comments from "./Comments"

const MovieDetails = (props) => {
    const context = useContext(AuthContext)
    const contextMovieDetails = useContext(AuthContextMovieDetails)
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setLoader(false)
        }, 900)
    }, [])

    const isAdd =
        JSON.parse(localStorage.getItem("addedItems")) &&
        JSON.parse(localStorage.getItem("addedItems")).find(
            (item) => item.id === contextMovieDetails.movieDetails.id
        ) &&
        true

    return (
        <>
            <div className={`movie-details${context.darkTema ? " dark" : ""}`}>
                {(context.isLoader || loader) && <Loader />}
                <div className="containerdetails">
                    <div className="movie-details__top">
                        <img
                            className="movie-details__poster"
                            src={`https://image.tmdb.org/t/p/original${contextMovieDetails.movieDetails.poster_path}`}
                            alt=""
                        />
                        <div className="movie-details__more">
                            <h1 className="movie-details__more-title">
                                {contextMovieDetails.movieDetails.title}
                            </h1>
                            <p className="movie-details__more-tagline">
                                {contextMovieDetails.movieDetails.tagline}
                            </p>
                            <div className="dod">
                                <div className="movie-details__add-trailer-wrap">
                                    <Add
                                        isAdd={isAdd}
                                        korzinaHandler={() =>
                                            props.korzinaHandler(
                                                contextMovieDetails.movieDetails
                                            )
                                        }
                                        movieDetails={true}
                                    />
                                    <Trailer />
                                </div>
                                <Rates id={props.id} />
                            </div>

                            <p className="movie-details__more-paragraph">
                                {!contextMovieDetails.movieDetails.overview
                                    ? "У цього фільму немає короткого опису"
                                    : contextMovieDetails.movieDetails.overview}
                            </p>
                            <Vote
                                vote={
                                    contextMovieDetails.movieDetails
                                        .vote_average
                                }
                            />
                            <div className="votes_count">
                                {contextMovieDetails.movieDetails.votes_count
                                    ? `Людей: ${contextMovieDetails.movieDetails.votes_count}`
                                    : "Ніхто не поставив оцінку"}
                            </div>

                            <p className="movie-details__more-paragraph">
                                Жанри: &nbsp;{" "}
                                {contextMovieDetails.movieDetails.genre_ids}
                            </p>
                            <div className="movie-details__more-footer">
                                <div className="movie-details__more-footer-item">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512"
                                    >
                                        <path d="M232 120C232 106.7 242.7 96 256 96C269.3 96 280 106.7 280 120V243.2L365.3 300C376.3 307.4 379.3 322.3 371.1 333.3C364.6 344.3 349.7 347.3 338.7 339.1L242.7 275.1C236 271.5 232 264 232 255.1L232 120zM256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0zM48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48C141.1 48 48 141.1 48 256z" />
                                    </svg>
                                    <p>
                                        Рік виходу:{" "}
                                        {
                                            contextMovieDetails.movieDetails
                                                .release_date
                                        }
                                    </p>
                                </div>
                                <div className="movie-details__more-footer-item">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512"
                                    >
                                        <path d="M75 75L41 41C25.9 25.9 0 36.6 0 57.9V168c0 13.3 10.7 24 24 24H134.1c21.4 0 32.1-25.9 17-41l-30.8-30.8C155 85.5 203 64 256 64c106 0 192 86 192 192s-86 192-192 192c-40.8 0-78.6-12.7-109.7-34.4c-14.5-10.1-34.4-6.6-44.6 7.9s-6.6 34.4 7.9 44.6C151.2 495 201.7 512 256 512c141.4 0 256-114.6 256-256S397.4 0 256 0C185.3 0 121.3 28.7 75 75zm181 53c-13.3 0-24 10.7-24 24V256c0 6.4 2.5 12.5 7 17l72 72c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-65-65V152c0-13.3-10.7-24-24-24z" />
                                    </svg>
                                    <p>
                                        {`Тривалість: ${
                                            contextMovieDetails.movieDetails
                                                .runtime === 0
                                                ? "77"
                                                : contextMovieDetails
                                                      .movieDetails.runtime
                                        } мин.`}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Actors />
                    <Gallery />
                    <Recommendation korzinaHandler={props.korzinaHandler} />
                    <Comments id={props.id} />
                </div>
            </div>
        </>
    )
}

export default MovieDetails
