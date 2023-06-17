import React from "react"

const Comment = ({ email, time, comment }) => {
    return (
        <div className="comment">
            <img
                src={`${process.env.PUBLIC_URL}/img/conversation.png`}
                alt="Коментар"
            />
            <div className="right-comment">
                <span className="email">{email}</span>,
                <span className="time-comment">{time}</span>
                <div className="comment-text">{comment}</div>
            </div>
        </div>
    )
}

export default Comment
