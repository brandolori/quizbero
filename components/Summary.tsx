import { useRef, useState } from "react"
import makeStyles from "../src/makeStyles"
import { Quiz } from "../src/quizData"

const styles = makeStyles({
    cardHolder: {
        position: "relative",
        width: "80%",
        height: 350,
        overflow: "visible",
        margin: 40
    },
    noMtop: { marginTop: 0 },
    cardImage: {
        margin: 0,
        height: 100
    },
    questionCounter: {
        fontFamily: "BalooBhai2, sans-serif",
        marginBottom: 0,
        fontSize: "1.25rem"
    },
    summaryCard: {
        position: "relative",
        backgroundColor: "var(--maincolor)",
        width: "80%",
        height: 500,
        borderRadius: 40,
        boxShadow: "0 8px 8px -4px grey",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
    },
    topSummaryCard: {
        position: "absolute",
        top: 10,
        bottom: "40%",
        left: 0,
        right: 0,
        fontSize: "1.3rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        textAlign: "center",
        padding: "30px 20px"
    },
    bottomSummaryCard: {
        position: "absolute",
        top: "60%",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "var(--cardcolor)",
        borderRadius: "0px 0px 40px 40px",
        fontSize: "1.25rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "30px 20px"
    },
    storyIndexHolder: {
        display: "flex",
        flexDirection: "row-reverse",
        alignItems: "stretch",
        position: "absolute",
        top: 7, left: 40, right: 40, height: 3
    },
    stamp: {
        borderRadius: 5,
        fontFamily: "BalooBhai2, sans-serif",
        lineHeight: "1.66rem",
        fontSize: "2rem",
        marginLeft: "auto",
        marginRight: "auto",
        width: 100,
        marginBottom: 10,
        overflowY: "hidden",
    },
    trueStamp: {
        border: "5px solid green",
        color: "green"
    },
    falseStamp: {
        border: "5px solid red",
        color: "red"
    }
})

const Summary = ({ data, playerAnswers }: { data: Quiz, playerAnswers: ("unanswered" | "v" | "f")[] }) => {
    const [index, setQuestionIndex] = useState(data.questions.length - 1)

    const summaryCardRef = useRef<HTMLDivElement>()
    return <>
        <div>
            <h1 style={styles.noMtop}>{data.name}</h1>
            <img draggable="false" style={styles.cardImage} src="/img/log.png" alt="" />
        </div>

        <div ref={summaryCardRef} style={styles.summaryCard} onClick={(ev) => {
            const clickPercent = (ev.clientX - summaryCardRef.current.getBoundingClientRect().left) / summaryCardRef.current.offsetWidth
            console.log(clickPercent)
            if (clickPercent < .3)
                setQuestionIndex((index) => Math.min(data.questions.length - 1, index + 1))
            if (clickPercent > .6)
                setQuestionIndex((index) => Math.max(0, index - 1))
        }}>
            <div style={styles.storyIndexHolder}>

                {data.questions.map((el, i) => <div key={i} style={{ backgroundColor: index == i ? "black" : "white", flex: 1, marginLeft: 5, marginRight: 5 }} />)}
            </div>

            <div style={styles.topSummaryCard}>
                <div>

                    {data.questions[index].question}
                </div>
                <div>
                    Hai risposto: {playerAnswers[index] == "v" ? "vero" : "falso"}
                </div>
                <img draggable="false" height={50} src={data.questions[index].answer == playerAnswers[index] ? "/img/check.png" : "/img/cross.png"} alt="" />
            </div>

            <div style={styles.bottomSummaryCard}>

                {data.questions[index].funFact}
            </div>

        </div>
    </>
}

export default Summary