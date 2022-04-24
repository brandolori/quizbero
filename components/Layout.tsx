import makeStyles from "../src/makeStyles"

const styles = makeStyles({
    container: {
        minHeight: "100%",
        margin: "0 auto",
        position: "relative",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        textAlign: "center",
        padding: "30px 0px",
        overflow: "hidden",
    },
})

const Layout = (props) => {

    return (<div style={{ width: "100%", height: "100%" }}>

        <style jsx>
            {`
            @media (min-width: 576px) {
                .container {
                    max-width: 576px;
                }
            }
            `}</style>
        <div style={styles.container} className="container">
            {props.children}
        </div>
    </div>
    )
}

export default Layout