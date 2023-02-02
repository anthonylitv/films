import React from "react"
import { useLocation, useNavigate } from "react-router-dom"

const AuthContextPagination = React.createContext({})

export const AuthContextPaginationProvider = (props) => {
    let { pathname } = useLocation()
    const navigate = useNavigate()

    function linkPage(id) {
        if (pathname === "/") {
            navigate(`/popular/page/${id}`)
        } else {
            if (!pathname.includes("page")) {
                navigate(`${pathname}page/${id}`)
            } else {
                const path = pathname.split("/")
                navigate(
                    `${path
                        .filter(
                            (item, index) =>
                                index !== path.length - 1 &&
                                index !== path.length - 2
                        )
                        .join("/")}/page/${id}`
                )
            }
        }
    }

    const choosePageHandler = (idPage) => {
        linkPage(idPage)
    }

    const changePageHandler = (change, idPage) => {
        if (change < 0) {
            linkPage(idPage - 1)
        } else if (change > 0) {
            linkPage(idPage + 1)
        }
    }

    return (
        <AuthContextPagination.Provider
            value={{
                choosePageHandler: choosePageHandler,
                changePageHandler: changePageHandler,
            }}
        >
            {props.children}
        </AuthContextPagination.Provider>
    )
}

export default AuthContextPagination
