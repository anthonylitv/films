const Preload = (props) => {
    return (
        <>
            {/* <link
                rel="preload"
                href={`https://image.tmdb.org/t/p/original${props.srcPost}`}
                as="image"
            /> */}
            <link
                rel="preload"
                href={`https://image.tmdb.org/t/p/original${props.srcBack}`}
                as="image"
            />
        </>
    )
}

export default Preload
