import { Outlet } from "react-router-dom"
import Header from "../Header/Header"

const Layout = (props) => {
    return (
        <>
            <Header isKorzinaClicked={props.isKorzinaClicked} />
            <Outlet />
        </>
    )
}

export default Layout
