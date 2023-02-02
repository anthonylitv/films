import React from "react"
import { useState, useEffect, useContext } from "react"
import { useLocation } from "react-router-dom"
import AuthContext from "./AuthContext"
import MovieDetails from "./components/MovieDetails/MovieDetails"
import { serverZapros } from "./components/ServerZapros"

const AuthContextMovieDetails = React.createContext({})

export const AuthContextMovieDetailsProvider = (props) => {
    const [movieDetails, setMovieDetails] = useState("")
    const location = useLocation()
    const [images, setImages] = useState()
    const [actors, setActors] = useState()
    const [recommendations, setRecommendations] = useState()
    const [videos, setVideos] = useState()
    const context = useContext(AuthContext)

    const installVote = (otvet) => {
        const tt = otvet.vote_average.toFixed(1).toString().split(".").pop()
        if (tt === "0" || tt === "9") {
            otvet.vote_average = Math.round(otvet.vote_average)
        } else {
            otvet.vote_average = otvet.vote_average.toFixed(1)
        }
    }

    useEffect(() => {
        const API_KEY = "6e378720ed647ca276496b70d3821b27"
        const id = location.pathname.split("/").pop().split("-")[0]

        context.setIsLoader(true)
        document.body.style.overflow = "hidden"

        setTimeout(() => {
            context.setIsLoader(false)
            window.scrollTo(0, 0)
            document.body.style.overflow = "auto"
        }, 500)

        fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=ru-RU`
        )
            .then((response) => response.json())
            .then((otvet) => {
                installVote(otvet)
                let genres = otvet.genres.map((item) => item.name)
                let slovo = genres[0].split("")
                slovo[0] = slovo[0].toUpperCase()
                genres[0] = slovo.join("")
                otvet.genres = genres.join(", ")
                const newOtvet = { ...otvet, genre_ids: otvet.genres }
                setMovieDetails(newOtvet)
                window.scrollTo(0, 0)
            })

        fetch(
            `https://api.themoviedb.org/3/movie/${id}/images?api_key=${API_KEY}`
        )
            .then((response) => response.json())
            .then((otvet) =>
                setImages(
                    otvet.backdrops
                        .filter((item, index) => item.file_path && index < 15)
                        .map((item) => item.file_path)
                )
            )

        fetch(
            `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
        )
            .then((response) => response.json())
            .then((otvet) =>
                setActors(
                    otvet.cast.filter((item, index) => item.name && index < 15)
                )
            )

        serverZapros(
            `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${API_KEY}&language=ru-RU`
        ).then((otvet) => {
            otvet[0].forEach((item) => {
                installVote(item)
            })
            setRecommendations(otvet[0].filter((item, index) => index < 6))
        })

        fetch(
            `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
        )
            .then((response) => response.json())
            .then((otvet) => {
                console.log(otvet.results)
                setVideos(otvet.results)
            })
    }, [location.pathname])

    return (
        <AuthContextMovieDetails.Provider
            value={{
                movieDetails: movieDetails,
                images: images,
                actors: actors,
                recommendations: recommendations,
                videos: videos,
            }}
        >
            <MovieDetails korzinaHandler={props.korzinaHandler} />
        </AuthContextMovieDetails.Provider>
    )
}

export default AuthContextMovieDetails
