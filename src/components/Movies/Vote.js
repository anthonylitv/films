import "./Vote.scss"

const Vote = (props) => {
    const color = () => {
        if (props.vote >= 8) {
            return "green"
        } else if (props.vote < 5) {
            return "red"
        } else if (props.vote === "-") {
            return "gray"
        } else {
            return "orange"
        }
    }

    return <div className={`movie-content__vote ${color()}`}>{props.vote}</div>
}

export default Vote
