import ReactDOM from "react-dom/client"
import App from "./App"
import { AuthContextProvider } from "./AuthContext"
import { BrowserRouter } from "react-router-dom"
import { AuthContextSearchPageProvider } from "./AuthContextSearchPage"
import { AuthContextPaginationProvider } from "./AuthContextPagination"

if (JSON.parse(localStorage.getItem("dark"))) {
    document.body.style.backgroundColor = "black"
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <BrowserRouter>
        <AuthContextProvider>
            <AuthContextSearchPageProvider>
                <AuthContextPaginationProvider>
                    <App />
                </AuthContextPaginationProvider>
            </AuthContextSearchPageProvider>
        </AuthContextProvider>
    </BrowserRouter>
)
