import "./Kategories.scss"
import AuthContext from "../AuthContext"
import { useContext } from "react"
import { useLocation } from "react-router-dom"

const Kategories = () => {
    const location = useLocation()
    const context = useContext(AuthContext)
    const kategory = location.pathname.split("/")[1]
    return (
        <div className={`kategories${context.darkTema ? " dark" : ""}`}>
            <input
                className="kategories__input"
                type="radio"
                name="kat"
                id="popular"
                onChange={(event) =>
                    context.changeKategoryHandler(event.target.id)
                }
                defaultChecked={
                    !kategory ? true : kategory === "popular" && true
                }
            />
            <label className="kategories__label" htmlFor="popular">
                Популярные
            </label>
            <input
                className="kategories__input"
                type="radio"
                name="kat"
                id="now_playing"
                onChange={(event) =>
                    context.changeKategoryHandler(event.target.id)
                }
                defaultChecked={kategory === "now_playing" && true}
            />
            <label className="kategories__label" htmlFor="now_playing">
                Сейчас смотрят
            </label>

            <input
                className="kategories__input"
                type="radio"
                name="kat"
                id="upcoming"
                onChange={(event) =>
                    context.changeKategoryHandler(event.target.id)
                }
                defaultChecked={kategory === "upcoming" && true}
            />
            <label className="kategories__label" htmlFor="upcoming">
                В ожидании
            </label>
        </div>
    )
}

export default Kategories
