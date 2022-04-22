import { GetStaticPaths, GetStaticProps } from "next"
import { useState } from "react"
import data, { Quiz } from "../src/quizData"

type QuizPageProps = {
    data: Quiz
}

const QuizPage = ({ data }: QuizPageProps) => {

    // the index of the question that is being answered, or reviewed in the summary
    const [questionIndex, setQuestionIndex] = useState(0)

    // only one phase of the quiz active at any time
    const [phase, setPhase] = useState<"intro" | "questions" | "reveal" | "summary">("intro")

    // array of the same size as the question array, containing at any time the player answer, or "unanswered"
    const [playerAnswers, setPlayerAnswers] = useState<("unanswered" | "v" | "f")[]>(data.questions.map(el => "unanswered"))

    const question = data.questions[questionIndex]

    const rightAnswersNeeded = Math.round(data.questions.length * 2 / 3)

    const checkWin = () =>
        playerAnswers.map(
            (el, i) => data.questions[i].answer == el
                ? 1
                : 0)
            .reduce((acc, sum) => acc + sum, 0) >= rightAnswersNeeded
            ? true
            : false


    const answerCallback = (answer: "v" | "f") => {
        setPlayerAnswers(answers => answers.map((el, i) => i == questionIndex
            ? answer
            : el))

        if (questionIndex + 1 < data.questions.length)
            setQuestionIndex((index) => index + 1)
        else
            setPhase("reveal")
    }

    return <>
        <div>{data.id}</div>
        <div>{data.name}</div>
        <div>
            {phase == "intro" && <div>
                benvenuto in quizbero!
                <button onClick={() => setPhase("questions")}>avanti</button>
            </div>}

            {phase == "questions" && <div>
                <div>{question.question}</div>
                <button onClick={() => answerCallback("v")}>vero</button>
                <button onClick={() => answerCallback("f")}>falso</button>
            </div>}

            {phase == "reveal" && <div>
                {checkWin()
                    ? <>hai vinto 😊</>
                    : <>hai perso 😢</>}
                <button onClick={() => {
                    setQuestionIndex(0)
                    setPhase("summary")
                }}>avanti</button>
            </div>}

            {phase == "summary" && <div>
                <div>{question.question}</div>
                <div>la risposta era: {question.answer}</div>
                <div>tu hai risposto: {playerAnswers[questionIndex]}</div>
                <div>{question.funFact}</div>
                <button onClick={() => {
                    if (questionIndex + 1 < data.questions.length)
                        setQuestionIndex((index) => index + 1)
                    else
                        setPhase("reveal")
                }}>avanti</button>
            </div>}
        </div>
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