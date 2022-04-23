import { GetStaticPaths, GetStaticProps } from "next"
import { useEffect, useState } from "react"
import data, { Quiz } from "../src/quizData"
import makeStyles from "../src/makeStyles"
import Card from "../components/Card"
import { motion, Variants } from "framer-motion"

const styles = makeStyles({
    cardHolder: {
        position: "relative",
        width: "80%",
        height: 350,
        overflow: "visible",
        margin: 40
    },
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
    noMtop: { marginTop: 0 },
    cardImage: {
        margin: 0,
        height: 100
    },
    questionCounter: {
        fontFamily: "BalooBhai2, sans-serif",
        marginBottom: 0,
        fontSize: "1.25rem"
    }
})

type QuizPageProps = {
    data: Quiz
}

const QuizPage = ({ data }: QuizPageProps) => {

    // only one phase of the quiz active at any time
    const [phase, setPhase] = useState<"intro" | "questions" | "reveal" | "summary">("intro")

    // array of the same size as the question array, containing at any time the player answer, or "unanswered"
    const [playerAnswers, setPlayerAnswers] = useState<("unanswered" | "v" | "f")[]>(data.questions.map(el => "unanswered"))

    const rightAnswersNeeded = Math.round(data.questions.length * 2 / 3)

    const checkWin = () =>
        playerAnswers.map(
            (el, i) => data.questions[i].answer == el
                ? 1
                : 0)
            .reduce((acc, sum) => acc + sum, 0) >= rightAnswersNeeded
            ? true
            : false


    const answerCallback = (answer: "v" | "f", index: number) => {
        setPlayerAnswers(answers => answers.map((el, i) => i == index
            ? answer
            : el))
    }

    // every time playerAnswers changes, check if there are any more questions
    // if not, go to the reveal phase
    useEffect(() => {
        if (!playerAnswers.includes("unanswered")) {
            setPhase("reveal")
        }
    }, [playerAnswers])

    return <>
        {phase == "intro" && <>
            <h1 style={styles.noMtop}>Hai trovato un Quizbero!</h1>
            <div>
                <img src="/img/log.png" alt="" />
                <h2>Quercia verde</h2>
            </div>

            <button style={styles.orangeButton} onClick={() => setPhase("questions")}>AFFRONTALO!</button>
        </>}


        {phase == "questions" &&
            <>
                <h1 style={styles.noMtop}>{data.name}</h1>
                <img style={styles.cardImage} src="/img/log.png" alt="" />
                <div style={styles.cardHolder}>
                    {
                        data.questions.map((el, i) =>
                            playerAnswers[i] == "unanswered" && <Card
                                key={i}
                                question={el.question}
                                onAnswer={(answer) => answerCallback(answer, i)}
                                interactable={playerAnswers.lastIndexOf("unanswered") == i}
                            />
                        )
                    }
                </div>
                <div style={styles.questionCounter}>{data.questions.length - playerAnswers.lastIndexOf("unanswered")} di {data.questions.length}</div>
            </>}

        {phase == "reveal" && <>
            <Reveal result={checkWin() ? "w" : "l"} onButtonClick={() => setPhase("summary")} />
        </>}
    </>;
}

const Reveal = ({ result, onButtonClick }: { result: "w" | "l", onButtonClick: () => void }) => {
    const [revealState, setRevealState] = useState<"loading" | "success" | "failure">("loading")
    console.log("reloading with", revealState)
    const logAnimations: Variants = {
        loading: {
            scale: .8,
            scaleY: [1, .9, 1],
            y: [0, 10, 0],
            filter: "grayscale(50%)",
            transition: { repeat: Infinity, repeatDelay: 1 }
        },
        success: {
            scale: 1,
            filter: "grayscale(0%)",
        },
        failure: {
            scale: 1,
            filter: "grayscale(100%)",
        }
    }
    const uiAnimations: Variants = {
        loading: {
            opacity: 0,
        },
        success: {
            scale: [1.1, 1],
            opacity: 1
        },
        failure: {
            scale: [1.1, 1],
            opacity: 1
        }
    }

    useEffect(() => {
        setTimeout(() => {
            console.log("una volta sola?")
            setRevealState(result == "w" ? "success" : "failure")
        }, Math.random() * 2000 + 2000)
    }, [])

    return <>
        <motion.h1
            variants={uiAnimations}
            animate={revealState}
            initial={false}
        >{result == "w"
            ? "Quizbero completato!"
            : "Quizbero fallito..."}</motion.h1>

        <div style={{ margin: "auto" }}>
            <motion.img
                variants={logAnimations}
                animate={revealState}
                initial="loading"
                src="/img/log.png" alt="" />
            <div style={{ fontSize: "6rem", opacity: revealState == "loading" ? 1 : 0 }}>
                <motion.span
                    animate={{ opacity: [1, 0, 0, 0] }}
                    transition={{ repeat: Infinity }}>.</motion.span>
                <motion.span
                    animate={{ opacity: [0, 1, 0, 0] }}
                    transition={{ repeat: Infinity }}>.</motion.span>
                <motion.span
                    animate={{ opacity: [0, 0, 1, 0] }}
                    transition={{ repeat: Infinity }}>.</motion.span>
            </div>
        </div>

        <motion.button
            variants={uiAnimations}
            animate={revealState}
            initial={false}
            style={styles.orangeButton} onClick={onButtonClick}>AVANTI
        </motion.button>
    </>
}

type QuizPagePaths = {
    quiz: string
}

export const getStaticProps: GetStaticProps<QuizPageProps, QuizPagePaths> = async ({ params: { quiz } }) => {
    const datas = data.find(el => el.id == quiz)!

    return {
        props: {
            data: datas
        }
    }
}

export const getStaticPaths: GetStaticPaths<QuizPagePaths> = async () => ({
    paths: data.map(el => (
        {
            params: {
                quiz: el.id
            }
        }
    )),
    fallback: false
})

export default QuizPage