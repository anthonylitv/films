import { useContext } from "react"
import "./Page.scss"
import AuthContext from "../../AuthContext"

const Page = (props) => {
    const context = useContext(AuthContext)
    return (
        <>
            <input
                type="radio"
                id={props.id}
                name="page"
                className={`pages__page-input${props.darkTema ? " dark" : ""}`}
                onClick={() => {
                    props.choosePage(props.text)
                    window.scrollTo(0, 0)
                    context.setIsLoader(true)
                }}
                checked={props.id === props.page && true}
                onChange={(e) => {}}
            />
            <label
                className={`pages__page-label${props.darkTema ? " dark" : ""}`}
                htmlFor={props.id}
            >
                {props.text}
            </label>
        </>
    )
}

export default Page
