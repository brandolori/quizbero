import makeStyles from "./makeStyles"

const theme = {
    mainColor: "#d7ebba",
    backgroundColor: "#9ad2cb",
    cardColor: "#eaeaea",
    balooColor: "#3f3f3f"
}

const calculateXP = (completedQuizzes: number) => 1000 * Math.sqrt(3 * completedQuizzes)

type UserData = {
    completedQuizzes: string[]
}

const getUserData = (): UserData => JSON.parse(localStorage.getItem("userdata")) ?? { completedQuizzes: [] }

const setUserData = (data: UserData) => {
    localStorage.setItem("userdata", JSON.stringify(data))
}

const commonStyles = makeStyles({
    orangeButton: {
        backgroundColor: "var(--maincolor)",
        borderRadius: 40,
        padding: 30,
        border: "none",
        boxShadow: "0 8px 8px -4px grey",
        fontSize: "1.5rem",
        lineHeight: "1.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        fontFamily: "BalooBhai2, sans-serif",
        color: "#3f3f3f",
    },
})

export { theme, commonStyles, calculateXP, getUserData, setUserData }
