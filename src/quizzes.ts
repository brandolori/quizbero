import { unlockArchievement } from "./archievements"

export type Question = {
    question: string,
    answer: "v" | "f",
    funFact: string
}

export type Quiz = {
    name: string,
    id: string,
    questions: Question[]
}

const data: Quiz[] = [
    {
        name: "Quercia alta",
        id: "0",
        questions: [
            {
                question: "L'Università di Bologna ricicla il 30% della carta che utilizza",
                answer: "v",
                funFact: "Unibo supera la media nazionale del 20%!",
            },
            {
                question: "La maggior parte delle tesi non viene neanche stampata",
                answer: "f",
                funFact: "Gli studenti continuano a preferire la versione cartacea della propria tesi",
            },
            {
                question: "La dematerializzazione non ha alcun effetto benefico",
                answer: "f",
                funFact: "Grazie alla dematerializzazione, unibo ha salvato 1000 alberi solo nel 2021!",
            }
        ]
    },
    {
        name: "Abete verde",
        id: "1",
        questions: [
            {
                question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                answer: "v",
                funFact: "Unibo supera la media nazionale del 20%!",
            },
            {
                question: "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
                answer: "f",
                funFact: "Gli studenti continuano a preferire la versione cartacea della propria tesi",
            },
            {
                question: "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
                answer: "f",
                funFact: "Grazie alla dematerializzazione, unibo ha salvato 1000 alberi solo nel 2021!",
            }
        ]
    },
    {
        name: "Abete giallo",
        id: "2",
        questions: [
            {
                question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                answer: "v",
                funFact: "Unibo supera la media nazionale del 20%!",
            },
            {
                question: "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
                answer: "f",
                funFact: "Gli studenti continuano a preferire la versione cartacea della propria tesi",
            },
            {
                question: "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
                answer: "f",
                funFact: "Grazie alla dematerializzazione, unibo ha salvato 1000 alberi solo nel 2021!",
            }
        ]
    },
    {
        name: "Pino blu",
        id: "3",
        questions: [
            {
                question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                answer: "v",
                funFact: "Unibo supera la media nazionale del 20%!",
            },
            {
                question: "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
                answer: "f",
                funFact: "Gli studenti continuano a preferire la versione cartacea della propria tesi",
            },
            {
                question: "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
                answer: "f",
                funFact: "Grazie alla dematerializzazione, unibo ha salvato 1000 alberi solo nel 2021!",
            }
        ]
    },
]


const localStorageKey = "quizzes"

const calculateXP = (completedQuizzes: number) => 1000 * Math.sqrt(3 * completedQuizzes)

const getCompletedQuizzes = () => JSON.parse(localStorage.getItem(localStorageKey)) ?? []

const setCompletedQuizzes = (completedQuizzes: string[]) => {
    localStorage.setItem(localStorageKey, JSON.stringify(completedQuizzes))

    if (calculateXP(completedQuizzes.length) >= 2000)
        unlockArchievement("lvl2")
}

export default data

export { getCompletedQuizzes, setCompletedQuizzes, calculateXP }