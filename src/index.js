import ReactDOM from "react-dom/client"
import App from "./App"
import { AuthContextProvider } from "./AuthContext"
import { BrowserRouter } from "react-router-dom"
import { AuthContextSearchPageProvider } from "./AuthContextSearchPage"
import { AuthContextPaginationProvider } from "./AuthContextPagination"
import "./firebase"
import { Provider } from "react-redux"
import { store } from "./components/reducers/store"

if (JSON.parse(localStorage.getItem("dark"))) {
    document.body.style.backgroundColor = "black"
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <AuthContextProvider>
                <AuthContextSearchPageProvider>
                    <AuthContextPaginationProvider>
                        <App />
                    </AuthContextPaginationProvider>
                </AuthContextSearchPageProvider>
            </AuthContextProvider>
        </BrowserRouter>
    </Provider>
)
