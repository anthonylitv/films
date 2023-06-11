import React, { useContext } from "react"
import "./Rates.scss"
import Rate from "./Rate"
import AuthContextMovieDetails from "../../AuthContextMovieDetails"

const Rates = (props) => {
    const context = useContext(AuthContextMovieDetails)

    return (
        <div className={`rates ${context.isRated ? "disabled" : ""}`}>
            {context.isRated && (
                <span className="info">Ви поставили оцінку</span>
            )}

            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                <Rate key={item} rate={item} id={props.id} />
            ))}
        </div>
    )
}

export default Rates
