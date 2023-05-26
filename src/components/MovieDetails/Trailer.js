import { useContext, useState } from "react"
import "./Trailer.scss"
import AuthContextMovieDetails from "../../AuthContextMovieDetails"
import TrailerLoader from "./TrailerLoader"

const Trailer = () => {
    const contextMovieDetails = useContext(AuthContextMovieDetails)
    const [isModalTrailer, setIsModalTrailer] = useState(false)
    const [isTrailerLoader, setIsTrailerLoader] = useState(false)

    const modalTrailerHandler = (event) => {
        if (event.target.hasAttribute("data-close")) {
            setIsModalTrailer(false)
            document.body.style.overflow = "auto"
        }
    }
    const buttonTrailerHandler = () => {
        setIsModalTrailer(true)
        setIsTrailerLoader(true)
        setTimeout(() => {
            setIsTrailerLoader(false)
        }, 800)
        document.body.style.overflow = "hidden"
    }

    return (
        <>
            {contextMovieDetails.videos &&
                contextMovieDetails.videos.length !== 0 && (
                    <div
                        className="movie-details__trailer-button"
                        onClick={buttonTrailerHandler}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 384 512"
                        >
                            <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
                        </svg>
                        <p>Дивитись трейлер</p>
                    </div>
                )}

            {isModalTrailer && (
                <>
                    <div
                        className="movie-details__modal-trailer"
                        onClick={modalTrailerHandler}
                        data-close
                    >
                        {!isTrailerLoader && (
                            <div className="movie-details__modal-trailer-content">
                                {contextMovieDetails.videos && (
                                    <iframe
                                        width="660"
                                        height="415"
                                        src={`https://www.youtube.com/embed/${contextMovieDetails.videos[0].key}`}
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                )}
                                <p className="movie-details__more-paragraph">
                                    {!contextMovieDetails.movieDetails.overview
                                        ? "У цього фільму немає короткого опису"
                                        : contextMovieDetails.movieDetails
                                              .overview}
                                </p>
                            </div>
                        )}

                        <button
                            className="movie-details__modal-trailer-close"
                            onClick={modalTrailerHandler}
                            data-close
                        >
                            &#10006;
                        </button>
                        {isTrailerLoader && <TrailerLoader />}
                    </div>
                </>
            )}
        </>
    )
}

export default Trailer
