import { GetStaticPaths, GetStaticProps } from "next"
import { useEffect, useState } from "react"
import data, { Quiz } from "../src/quizData"
import makeStyles from "../src/makeStyles"
import Card from "../components/Card"



const styles = makeStyles({
    cardHolder: {
        position: "relative",
        width: "80%",
        height: 400,
        overflow: "visible",
        marginX: "auto",
    },
    container: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        minHeight: "100%"
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

    return <div style={styles.container}>
        <h1>{data.name}</h1>
        {phase == "intro" && <div>
            benvenuto in quizbero!
            <button onClick={() => setPhase("questions")}>avanti</button>
        </div>}
        {phase == "questions" &&
            <>
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
                <h3>{data.questions.length - playerAnswers.lastIndexOf("unanswered")} di {data.questions.length}</h3>
            </>
        }

        {phase == "reveal" && <div>
            {checkWin()
                ? <>hai vinto 😊</>
                : <>hai perso 😢</>}
            <button onClick={() => {
                setPhase("summary")
            }}>avanti</button>
        </div>}
    </div>;
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