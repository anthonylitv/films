import React from "react"
import "./Rates.scss"
import Rate from "./Rate"

const Rates = (props) => {
    return (
        <div className="rates">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                <Rate key={item} rate={item} id={props.id} />
            ))}
        </div>
    )
}

export default Rates
