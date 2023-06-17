import { useDispatch } from "react-redux"
import { useAuth } from "../useAuth"
import "./Comments.scss"
import { useEffect, useRef, useState } from "react"
import { setIsModalAuth } from "../reducers/userReducer"
import Comment from "./Comment"
import { useLocation } from "react-router-dom"

const Comments = (props) => {
    const { pathname } = useLocation()
    const { isAuthorizated, email } = useAuth()
    const dispatch = useDispatch()
    const [textArea, setTextArea] = useState("")
    const [comments, setComments] = useState([])
    const [isCorrect, setIsCorrect] = useState(true)
    const [obnov, setObnov] = useState(true)

    useEffect(() => {
        fetch(
            "https://newratefilms-default-rtdb.firebaseio.com/commentsFilms.json"
        )
            .then((response) => response.json())
            .then((otvet) =>
                setComments(
                    Object.values(otvet).filter((item) => item.id == props.id)
                )
            )
    }, [obnov, pathname])

    const commentFetchHandler = () => {
        if (isAuthorizated && textArea.trim().length > 0) {
            fetch(
                "https://newratefilms-default-rtdb.firebaseio.com/commentsFilms.json",
                {
                    method: "POST",
                    body: JSON.stringify({
                        id: props.id,
                        comment: textArea,
                        email,
                        time: new Date().toLocaleString(),
                    }),
                }
            ).then(() => {
                setTextArea("")
                setObnov((prev) => !prev)
            })
        } else if (!isAuthorizated) {
            dispatch(setIsModalAuth(true))
        } else if (isAuthorizated && textArea.trim().length === 0) {
            setIsCorrect(false)
        }
    }

    return (
        <>
            <div className="send-comment">
                <textarea
                    value={textArea}
                    onChange={(event) => {
                        setIsCorrect(true)
                        setTextArea(event.target.value)
                    }}
                    placeholder="Ваш коментар"
                    className={`${!isCorrect ? "not" : ""}`}
                ></textarea>
                <button onClick={commentFetchHandler}>Відправити</button>
            </div>
            <h1 className="main-h1">Коментарі</h1>
            <div className="comments-container">
                {comments.map((item, index) => (
                    <Comment
                        key={index}
                        email={item.email}
                        time={item.time}
                        comment={item.comment}
                    />
                ))}
            </div>
        </>
    )
}

export default Comments
