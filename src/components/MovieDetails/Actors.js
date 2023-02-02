import { useContext } from "react"
import AuthContextMovieDetails from "../../AuthContextMovieDetails"
import "./Actors.scss"
import actorNull from "./img_movie-details/actor-null.jpg"
const Actors = () => {
    const contextMovieDetails = useContext(AuthContextMovieDetails)

    const actorItems =
        contextMovieDetails.actors &&
        contextMovieDetails.actors.map((item, index) => (
            <div className="movie-details__actor" key={index}>
                <img
                    src={
                        item.profile_path
                            ? `https://image.tmdb.org/t/p/original${item.profile_path}`
                            : actorNull
                    }
                    alt=""
                />
                <h1>{item.name}</h1>
            </div>
        ))

    return <div className="movie-details__actors">{actorItems}</div>
}

export default Actors
