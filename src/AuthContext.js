import React from "react"
import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { serverZapros } from "./components/ServerZapros"

const AuthContext = React.createContext({
    choosePageHandler: () => {},
    changePageHandler: () => {},
    changeKategoryHandler: () => {},
    darkTemaHandler: () => {},
    searchHandler: () => {},
})

export const AuthContextProvider = (props) => {
    const location = useLocation()
    const navigate = useNavigate()
    const [katalog, setKatalog] = useState([])
    const [page, setPage] = useState(parseInt(sessionStorage.getItem("page")))
    const [isLoader, setIsLoader] = useState(false)
    const [kategory, setKategory] = useState(sessionStorage.getItem("kategory"))
    const [totalPages, setTotalPages] = useState()
    const [darkTema, setDarkTema] = useState(
        JSON.parse(localStorage.getItem("dark"))
    )
    const locationPathnameArr =
        location.pathname.split("/")[location.pathname.split("/").length - 1]

    useEffect(() => {
        if (
            !location.pathname.includes("search") &&
            !location.pathname.includes("my") &&
            !location.pathname.includes("movie")
        ) {
            const API_KEY = "6e378720ed647ca276496b70d3821b27"
            const pageLS =
                location.pathname.split("/")[
                    location.pathname.split("/").length - 1
                ]
            const kategoryLS = location.pathname.split("/")[1]

            setIsLoader(true)
            document.body.style.overflow = "hidden"
            setTimeout(() => {
                window.scrollTo(0, 0)
            }, 10)
            setTimeout(() => {
                setIsLoader(false)
                document.body.style.overflow = "auto"
            }, 900)

            serverZapros(
                `https://api.themoviedb.org/3/movie/${
                    kategoryLS ? kategoryLS : "popular"
                }?api_key=${API_KEY}&language=en-EN&page=${pageLS}`
            ).then((response) => {
                setKatalog(response[0])
                setTotalPages(response[1])
            })
        }
    }, [location.pathname])

    const changeKategoryHandler = (id) => {
        navigate(`/${id}/page/1`)
        sessionStorage.removeItem("search")
        sessionStorage.removeItem("searchValue")
    }

    const darkTemaHandler = () => {
        if (document.body.style.backgroundColor !== "black") {
            document.body.style.backgroundColor = "black"
        } else {
            document.body.style.backgroundColor = "white"
        }

        setDarkTema((prevTema) => {
            localStorage.setItem("dark", !prevTema)
            return !prevTema
        })
    }

    return (
        <AuthContext.Provider
            value={{
                katalog: katalog,
                page: page,
                isLoader: isLoader,
                kategory: kategory,
                totalPages: totalPages,
                darkTema: darkTema,
                locationPathnameArr: locationPathnameArr,
                setPage: setPage,
                setIsLoader: setIsLoader,
                changeKategoryHandler: changeKategoryHandler,
                darkTemaHandler: darkTemaHandler,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext
