import makeStyles from "../src/makeStyles"

const styles = makeStyles({
    container: {
        minHeight: "100%",
        margin: "0 auto",
        position: "relative",
    },
})

const Layout = (props) => {

    return (<div style={{ width: "100%", height: "100%" }}>

        <style jsx>
            {`
            @media (min-width: 768px) {
                .container {
                    max-width: 768px;
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