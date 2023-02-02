import "./App.scss"
import MovieContainer from "./components/Movies/MovieContainer"
import { useContext, useState, useEffect, useRef } from "react"
import AuthContext from "./AuthContext"
import { AuthContextMovieDetailsProvider } from "./AuthContextMovieDetails"
import { Routes, Route, Navigate } from "react-router-dom"
import Layout from "./components/Layout/Layout"
import MyMovies from "./components/MyMovies/MyMovies"
import SearchPage from "./components/SearchPage/SearchPage"

if (!localStorage.getItem("addedItems")) {
    localStorage.setItem("addedItems", JSON.stringify([]))
}

function App() {
    const context = useContext(AuthContext)
    const [isKorzinaAnim, setIsKorzinaAnim] = useState(false)

    const isKorzinaClickedHandler = (isClicked) => {
        setIsKorzinaAnim(isClicked)
    }

    const [addedItemsLS, setAddedItemsLS] = useState(
        JSON.parse(localStorage.getItem("addedItems"))
    )

    function korzinaHandler(propsItem) {
        const item = {
            darkTema: propsItem.darkTema,
            key: propsItem.id,
            id: propsItem.id,
            poster_path: propsItem.poster_path,
            backdrop_path: propsItem.backdrop_path,
            title: propsItem.title,
            overview: propsItem.overview,
            vote_average: propsItem.vote_average,
            genre_ids: propsItem.genre_ids,
            korzinaHandler: propsItem.korzinaHandler,
            isAdd: true,
        }

        setAddedItemsLS((prevAddedItems) => {
            if (
                JSON.parse(localStorage.getItem("addedItems")).find(
                    (itemFind) => itemFind.id === item.id
                )
            ) {
                const LS = JSON.parse(
                    localStorage.getItem("addedItems")
                ).filter((itemFind) => itemFind.id !== item.id)
                localStorage.setItem("addedItems", JSON.stringify(LS))
                return LS
            } else {
                localStorage.setItem(
                    "addedItems",
                    JSON.stringify([item, ...prevAddedItems])
                )
                return [item, ...prevAddedItems]
            }
        })
    }

    const firstUpdate = useRef(true)
    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false
            return
        }

        isKorzinaClickedHandler(true)
        const timer = setTimeout(() => {
            isKorzinaClickedHandler(false)
        }, 150)

        return () => {
            clearTimeout(timer)
        }
    }, [addedItemsLS])

    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={<Layout isKorzinaClicked={isKorzinaAnim} />}
                >
                    <Route
                        index
                        element={
                            <MovieContainer
                                addedItemsLS={addedItemsLS}
                                korzinaHandler={korzinaHandler}
                            />
                        }
                    />
                    <Route
                        path="page/:id"
                        element={
                            <MovieContainer
                                addedItemsLS={addedItemsLS}
                                korzinaHandler={korzinaHandler}
                            />
                        }
                    />
                    <Route
                        path="movie-details/:title"
                        element={
                            <AuthContextMovieDetailsProvider
                                addedItemsLS={addedItemsLS}
                                korzinaHandler={korzinaHandler}
                            />
                        }
                    />
                    <Route
                        path="/:kategory/page/:id"
                        element={
                            <MovieContainer
                                addedItemsLS={addedItemsLS}
                                korzinaHandler={korzinaHandler}
                            />
                        }
                    />
                    <Route
                        path="my-movies"
                        element={
                            <MyMovies
                                korzinaHandler={korzinaHandler}
                                addedItemsLS={addedItemsLS}
                            />
                        }
                    />
                    <Route
                        path="search/:title"
                        element={
                            <>
                                <SearchPage
                                    addedItemsLS={addedItemsLS}
                                    korzinaHandler={korzinaHandler}
                                />
                            </>
                        }
                    />
                    <Route
                        path="search/:title/page/:id"
                        element={
                            <>
                                <SearchPage
                                    addedItemsLS={addedItemsLS}
                                    korzinaHandler={korzinaHandler}
                                />
                            </>
                        }
                    />
                    <Route path="*" element={<Navigate to="/" />} />
                </Route>
            </Routes>
        </>
    )
}

export default App
