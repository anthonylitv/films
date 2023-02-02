import { useEffect } from "react"
import { useContext, useState, useRef } from "react"
import { useLocation } from "react-router-dom"
import AuthContextMovieDetails from "../../AuthContextMovieDetails"
import "./Gallery.scss"
import logo from "./img_movie-details/gallery-null.svg"

const Gallery = () => {
    const location = useLocation()
    const contextMovieDetails = useContext(AuthContextMovieDetails)
    const bigImg = useRef()
    const smallImg = useRef()
    const amountTranslate = useRef(0)
    const [imageActive, setImageActive] = useState(0)
    const [isModalImg, setIsModalImg] = useState(false)
    const [srcModalImg, setSrcModalImg] = useState()

    useEffect(() => {
        bigImg.current.style = ""
        smallImg.current.style = ""
        amountTranslate.current = 0
        setImageActive(0)
    }, [location.pathname])

    function setImages(click = null) {
        return (
            contextMovieDetails.images &&
            (contextMovieDetails.images.length > 0 ? (
                contextMovieDetails.images.map((item, index) => (
                    <div
                        key={item}
                        className={`movie-details__item${
                            -index === imageActive ? " active" : ""
                        }`}
                        onClick={click}
                        data-index={index}
                    >
                        <img
                            src={`https://image.tmdb.org/t/p/w1280${item}`}
                            alt=""
                        />
                    </div>
                ))
            ) : (
                <div
                    key={0}
                    className="movie-details__item active"
                    onClick={click}
                    data-index={0}
                >
                    <img src={logo} alt="" />
                </div>
            ))
        )
    }

    const modalImg = () => {
        document.body.style.overflow = "hidden"

        const findImg = document.querySelector(
            ".movie-details__line .movie-details__item.active img"
        ).src

        setIsModalImg((prev) => !prev)
        setSrcModalImg(findImg)
    }

    const sliderHandler = (event) => {
        const bigImage = bigImg.current
        const smallImage = smallImg.current
        const widthBigImg = bigImage.offsetWidth
        const visibleSmallImages = 9

        if (event.target.hasAttribute("data-index")) {
            amountTranslate.current = -parseInt(
                event.target.getAttribute("data-index")
            )
            setImageActive(amountTranslate.current)
        }

        if (
            event.target.hasAttribute("data-btn-left") &&
            amountTranslate.current !== 0
        ) {
            amountTranslate.current += 1
            setImageActive(amountTranslate.current)
        } else if (
            event.target.hasAttribute("data-btn-right") &&
            -amountTranslate.current !== bigImage.childElementCount - 1
        ) {
            amountTranslate.current -= 1
            setImageActive(amountTranslate.current)
        }

        const childCountSmall = smallImage.childElementCount
        const ostatokImg = childCountSmall + amountTranslate.current
        const seredina = Math.round(visibleSmallImages / 2)
        const currentImgFromCenter = -amountTranslate.current - seredina + 1
        const gap = parseInt(getComputedStyle(smallImage).columnGap)

        if (smallImage.childElementCount > visibleSmallImages) {
            if (currentImgFromCenter <= 0) {
                smallImage.style.transform = `translateX(0px)`
            } else if (ostatokImg <= seredina) {
                smallImage.style.transform = `translateX(${
                    (smallImage.firstElementChild.offsetWidth + gap) *
                    -(childCountSmall - visibleSmallImages)
                }px)`
            } else {
                smallImage.style.transform = `translateX(${
                    (smallImage.firstElementChild.offsetWidth + gap) *
                    -currentImgFromCenter
                }px)`
            }
        }

        bigImage.style.transform = `translateX(${
            amountTranslate.current * widthBigImg
        }px)`
    }

    const bigImages = setImages(modalImg)
    const smallImages = setImages(sliderHandler)

    return (
        <div className="movie-details__gallery">
            <div className="movie-details__slider">
                <div className="movie-details__line" ref={bigImg}>
                    {bigImages}
                </div>
                {isModalImg && (
                    <div
                        className="movie-details__modal"
                        onClick={() => {
                            setIsModalImg(false)
                            document.body.style.overflow = "auto"
                        }}
                    >
                        <img src={srcModalImg} alt="" />
                    </div>
                )}
                <div className="movie-details__slider-mini" ref={smallImg}>
                    {smallImages}
                </div>
            </div>
            <div className="movie-details__slider-buttons">
                <button
                    className={`btn-left${
                        amountTranslate.current !== 0 ? "" : " disable"
                    }`}
                    onClick={sliderHandler}
                    data-btn-left
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                        className="btn-left"
                    >
                        <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 278.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
                    </svg>
                </button>
                <button
                    className={`btn-right${
                        bigImg.current &&
                        -amountTranslate.current !==
                            bigImg.current.childElementCount - 1
                            ? ""
                            : " disable"
                    }`}
                    onClick={sliderHandler}
                    data-btn-right
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                        className="btn-right"
                    >
                        <path d="M342.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L274.7 256 105.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default Gallery
