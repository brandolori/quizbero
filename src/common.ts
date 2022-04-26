import { unlockArchievement } from "./archievements"
import makeStyles from "./makeStyles"

const theme = {
    mainColor: "#d7ebba",
    backgroundColor: "#9ad2cb",
    cardColor: "#eaeaea",
    balooColor: "#3f3f3f"
}


const commonStyles = makeStyles({
    orangeButton: {
        backgroundColor: "var(--maincolor)",
        borderRadius: 40,
        padding: 30,
        border: "none",
        boxShadow: "0 8px 8px -4px grey",
        fontSize: "1.25rem",
        lineHeight: "1.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        fontWeight: "bold",
        margin: 10
    },
})

export { theme, commonStyles }
