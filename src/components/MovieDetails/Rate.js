import React, { useContext, useEffect, useState } from "react"
import AuthContextMovieDetails from "../../AuthContextMovieDetails"

const Rate = (props) => {
    const context = useContext(AuthContextMovieDetails)

    const rateFilmHandler = () => {
        if (!context.isRated) {
            localStorage.setItem(props.id, props.rate)

            fetch(
                "https://newratefilms-default-rtdb.firebaseio.com/ratedFilms.json",
                {
                    method: "POST",
                    body: JSON.stringify({
                        id: props.id,
                        rate: props.rate,
                    }),
                }
            )

            setTimeout(() => {
                context.setIsRated(true)
            }, 100)
        }
    }

    const onMouseEnterHandler = (event) => {
        const all = event.target.parentElement.children
        let onIndex = [...all].findIndex((item) => item === event.target)

        for (let i = 0; i <= onIndex; i++) {
            all[i].classList.add("active")
        }
    }

    const onMouseLeaveHandler = (event) => {
        const all = event.target.parentElement.children
        for (let element of all) {
            element.classList.remove("active")
        }
    }

    return (
        <div
            onClick={rateFilmHandler}
            onMouseEnter={onMouseEnterHandler}
            onMouseLeave={onMouseLeaveHandler}
            className={`rate ${
                JSON.parse(localStorage.getItem(props.id)) >= props.rate
                    ? "rated"
                    : ""
            }`}
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
            </svg>
        </div>
    )
}

export default Rate
