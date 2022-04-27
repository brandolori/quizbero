import { GetStaticPaths, GetStaticProps } from "next"
import { useEffect, useRef, useState } from "react"
import data, { Quiz } from "../src/quizzes"
import makeStyles from "../src/makeStyles"
import Card from "../components/Card"
import { commonStyles } from "../src/common"
import Reveal from "../components/Reveal"
import Summary from "../components/Summary"
import { unlockArchievement } from "../src/archievements"
import Layout from "../components/Layout"

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
    }
})

type QuizPageProps = {
    data: Quiz
}

const QuizPage = ({ data }: QuizPageProps) => {

    const [under5Seconds, setUnder5Seconds] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setUnder5Seconds(false)
        }, 5000);
    }, [])

    // only one phase of the quiz active at any time
    const [phase, setPhase] = useState<"intro" | "questions" | "reveal" | "summary">("intro")

    // array of the same size as the question array, containing at any time the player answer, or "unanswered"
    const [playerAnswers, setPlayerAnswers] = useState<("unanswered" | "v" | "f")[]>(data.questions.map(el => "unanswered"))

    const rightAnswersNeeded = Math.round(data.questions.length * 2 / 3)

    const checkWin = () => {
        const rightAnswers = playerAnswers
            .map((el, i) => data.questions[i].answer == el ? 1 : 0)
            .reduce((acc, sum) => acc + sum, 0)

        const win = rightAnswers >= rightAnswersNeeded

        // sezione archievements
        if (rightAnswers == rightAnswersNeeded)
            unlockArchievement("almost")

        if (rightAnswers == data.questions.length)
            unlockArchievement("noerrors")

        if (rightAnswers == 0)
            unlockArchievement("allerrors")

        if (win && under5Seconds)
            unlockArchievement("sonic")

        return win
    }


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
        {phase == "intro" && <Layout animateKey="intro">
            <h1 style={styles.noMtop}>Hai trovato un Quizbero!</h1>
            <div>
                <img height={150} draggable="false" src="/img/log.webp" alt="" />
                <h2>{data.name}</h2>
            </div>

            <button style={commonStyles.orangeButton} onClick={() => setPhase("questions")}>AFFRONTALO!</button>
        </Layout>}


        {phase == "questions" && <Layout animateKey="questions">
            <div>
                <h1 style={styles.noMtop}>{data.name}</h1>
                <img draggable="false" style={styles.cardImage} src="/img/log.webp" alt="" />
            </div>
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
        </Layout>}

        {phase == "reveal" && <Layout animateKey="reveal">
            <Reveal result={checkWin() ? "w" : "l"} onButtonClick={() => setPhase("summary")} />
        </Layout>}

        {phase == "summary" && <Layout animateKey="summary">
            <Summary data={data} playerAnswers={playerAnswers} success={checkWin()} />
        </Layout>}
    </>;
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