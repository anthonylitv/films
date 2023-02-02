import { useContext } from "react"
import "./Loader.scss"
import AuthContext from "../AuthContext"

const Loader = () => {
    const context = useContext(AuthContext)

    return (
        <div className={`loader-container${context.darkTema ? " dark" : ""}`}>
            <div className="loader"></div>
        </div>
    )
}

export default Loader
