import makeStyles from "../src/makeStyles"

const styles = makeStyles({
    container: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "100%",
        margin: "0 auto",
        padding: "1rem",
        boxSizing: "border-box"
    },
    footer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "1.5rem",
        fontSize: ".8rem",
        fontWeight: 200
    }
})

const Layout = (props) => {

    return (<div style={{ width: "100%", height: "100%" }}>

        <style jsx>
            {`
            @media (min-width: 768px) {
                .container {
                    width: 57%;
                    max-width: 800px;
                }
            }
            `}</style>
        <div style={styles.container} className="container">
            <div>
                {props.children}
            </div>
            <footer style={styles.footer}> Copyright 2021 Lorenzo Bartolini</footer>
        </div>
    </div>
    )
}

export default Layout