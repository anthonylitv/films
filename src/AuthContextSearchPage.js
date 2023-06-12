import React from "react"
import { useEffect, useState, useContext } from "react"
import { serverZapros } from "./components/ServerZapros"
import AuthContext from "./AuthContext"
import { useLocation } from "react-router-dom"

const AuthContextSearchPage = React.createContext({})

export const AuthContextSearchPageProvider = (props) => {
    const location = useLocation()
    const locationPathnameArr =
        location.pathname.split("/")[location.pathname.split("/").length - 1]
    const context = useContext(AuthContext)
    const [katalogSearchPage, setKatalogSearchPage] = useState([])
    const [totalPagesSearchPage, setTotalPagesSearchPage] = useState()
    const [searching, setSearching] = useState()

    useEffect(() => {
        if (location.pathname.includes("search")) {
            const path = location.pathname.split("/")[2]
            const searchQueryLS = `&query=${path}`
            const API_KEY = "6e378720ed647ca276496b70d3821b27"
            const pageLS =
                location.pathname.split("/")[
                    location.pathname.split("/").length - 1
                ]
            console.log(pageLS)
            context.setIsLoader(true)
            document.body.style.overflow = "hidden"
            setTimeout(() => {
                window.scrollTo(0, 0)
            }, 20)

            serverZapros(
                `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-EN${searchQueryLS}&page=${pageLS}`
            ).then((response) => {
                fetch(
                    "https://newratefilms-default-rtdb.firebaseio.com/ratedFilms.json"
                )
                    .then((responseRates) => responseRates.json())
                    .then((rates) => {
                        for (let movieResponse of response[0]) {
                            movieResponse.vote_average = []

                            for (let rate of Object.values(rates)) {
                                if (movieResponse.id == rate.id) {
                                    movieResponse.vote_average.push(rate.rate)
                                }
                            }
                            if (movieResponse.vote_average.length) {
                                let suma = movieResponse.vote_average.reduce(
                                    (item, acc) => item + acc,
                                    0
                                )
                                movieResponse.vote_average = (
                                    suma / movieResponse.vote_average.length
                                ).toFixed(1)
                            } else {
                                movieResponse.vote_average = "-"
                            }
                        }
                        setKatalogSearchPage(response[0])
                        setTotalPagesSearchPage(response[1])
                        setTimeout(() => {
                            context.setIsLoader(false)
                            if (response[0].length !== 0) {
                                document.body.style.overflow = "auto"
                            }
                        }, 900)
                    })
            })
        }
    }, [searching, location.pathname])

    return (
        <AuthContextSearchPage.Provider
            value={{
                totalPagesSearchPage: totalPagesSearchPage,
                katalogSearchPage: katalogSearchPage,
                setSearching: setSearching,
                locationPathnameArr: locationPathnameArr,
            }}
        >
            {props.children}
        </AuthContextSearchPage.Provider>
    )
}

export default AuthContextSearchPage
