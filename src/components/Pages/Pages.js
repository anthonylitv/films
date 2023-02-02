import "./Pages.scss"
import Page from "./Page"

const Pages = (props) => {
    let newPages = []
    if (props.totalPages > 11) {
        if (props.page <= 6) {
            newPages = new Array(12).fill()
            newPages = newPages.map((item, index) => (
                <Page
                    key={index + 1}
                    id={index + 1}
                    page={props.page}
                    text={index + 1}
                    choosePage={props.choosePage}
                    darkTema={props.darkTema}
                />
            ))
            newPages[newPages.length - 2] = <span key={55}>...</span>
            newPages[newPages.length - 1] = (
                <Page
                    key={props.totalPages}
                    id={props.totalPages}
                    page={props.page}
                    text={props.totalPages}
                    choosePage={props.choosePage}
                    darkTema={props.darkTema}
                />
            )
            ///////////////////////////////////////////
        } else if (props.page >= 7 && props.page <= props.totalPages - 5) {
            newPages = new Array(13).fill()
            newPages[0] = (
                <Page
                    key={1}
                    id={1}
                    text={1}
                    page={props.page}
                    choosePage={props.choosePage}
                    darkTema={props.darkTema}
                />
            )
            newPages[1] = <span key={4564645}>...</span>
            for (let i = props.page - 4; i <= props.page + 6; i++) {
                newPages[i] = (
                    <Page
                        key={i}
                        id={i}
                        text={i}
                        page={props.page}
                        choosePage={props.choosePage}
                        darkTema={props.darkTema}
                    />
                )
            }

            newPages[newPages.length - 2] = <span key={45545}>...</span>
            newPages[newPages.length - 1] = (
                <Page
                    key={props.totalPages}
                    id={props.totalPages}
                    page={props.page}
                    text={props.totalPages}
                    choosePage={props.choosePage}
                    darkTema={props.darkTema}
                />
            )
            newPages = newPages.filter((item) => item)
            ////////////////////////////////////////////////////
        } else {
            newPages = new Array(12).fill()
            newPages[0] = (
                <Page
                    key={1}
                    id={1}
                    page={props.page}
                    text={1}
                    choosePage={props.choosePage}
                    darkTema={props.darkTema}
                />
            )
            newPages[1] = <span key={5554}>...</span>
            for (let i = props.totalPages - 9; i <= props.totalPages; i++) {
                newPages[i] = (
                    <Page
                        key={i}
                        id={i}
                        page={props.page}
                        text={i}
                        choosePage={props.choosePage}
                        darkTema={props.darkTema}
                    />
                )
            }
            newPages = newPages.filter((item) => item)
        }
    } else {
        newPages = new Array(props.totalPages).fill()
        newPages = newPages.map((item, index) => (
            <Page
                key={index + 1}
                id={index + 1}
                page={props.page}
                text={index + 1}
                choosePage={props.choosePage}
                darkTema={props.darkTema}
            />
        ))
    }

    return (
        <div className={`pages${props.darkTema ? " dark" : ""}`}>
            {props.page !== 1 && (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    onClick={() => props.changePage(-1, props.page)}
                >
                    <path d="M256 0C114.6 0 0 114.6 0 256c0 141.4 114.6 256 256 256s256-114.6 256-256C512 114.6 397.4 0 256 0zM310.6 345.4c12.5 12.5 12.5 32.75 0 45.25s-32.75 12.5-45.25 0l-112-112C147.1 272.4 144 264.2 144 256s3.125-16.38 9.375-22.62l112-112c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L221.3 256L310.6 345.4z" />
                </svg>
            )}

            <div className="pages__main">{newPages}</div>

            {props.page !== props.totalPages && (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    onClick={() => props.changePage(1, props.page)}
                >
                    <path d="M256 0C114.6 0 0 114.6 0 256c0 141.4 114.6 256 256 256s256-114.6 256-256C512 114.6 397.4 0 256 0zM358.6 278.6l-112 112c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25L290.8 256L201.4 166.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l112 112C364.9 239.6 368 247.8 368 256S364.9 272.4 358.6 278.6z" />
                </svg>
            )}
        </div>
    )
}

export default Pages
