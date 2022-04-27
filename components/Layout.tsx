import { motion } from "framer-motion"
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

const Layout = ({ animateKey, children }) => {

    return (<motion.div
        key={animateKey}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ width: "100%", height: "100%" }}>

        <style jsx>
            {`
            @media (min-width: 576px) {
                .container {
                    max-width: 576px;
                }
            }
            `}</style>
        <div style={styles.container} className="container">
            {children}
        </div>
    </motion.div>
    )
}

export default Layout