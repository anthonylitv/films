export async function serverZapros(zapros) {
    const API_KEY = "6e378720ed647ca276496b70d3821b27"
    const searchQueryLS = sessionStorage.getItem("search")

    const responseGenres = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=ru-RU`
    )
    const genresResponse = await responseGenres.json()
    const genres = await genresResponse.genres

    const responseKatalog = await fetch(zapros)
    const katalogResponse = await responseKatalog.json()

    const katalogs = katalogResponse.results.filter(
        (item) => item.poster_path && item.genre_ids.length > 0
    )

    const findPagesTotal = () => {
        if (katalogResponse.total_pages > 500) {
            return 499
        } else if (katalogResponse.total_pages < 500 && !searchQueryLS) {
            return katalogResponse.total_pages - 2
        } else {
            return katalogResponse.total_pages
        }
    }

    for (let movie of katalogs) {
        for (let key in movie.genre_ids) {
            for (let genre of genres) {
                if (movie.genre_ids[key] === genre.id) {
                    movie.genre_ids[key] = genre.name
                }
            }
        }
        let slovo = movie.genre_ids[0].split("")
        slovo[0] = slovo[0].toUpperCase()
        slovo = slovo.join("")
        movie.genre_ids[0] = slovo
        movie.genre_ids = movie.genre_ids.join(", ")
    }

    return [katalogs, findPagesTotal()]
}
