import { unlockArchievement } from "./archievements"
import { bonusCodes } from "./getBonusCode"

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
                question: "Il numero di persone che muoiono di fame dal 2015 sta diminuendo",
                answer: "f",
                funFact: "Nel 2015 erano 784m, nel 2018 erano 822m",
            },
            {
                question: "La percentuale di adulti analfabeti al mondo è superiore del 15%",
                answer: "v",
                funFact: "È in costante discesa, ma si attesta al 20%",
            },
            {
                question: "In nessun paese a mondo ci sono più donne che uomini in parlamento",
                answer: "f",
                funFact: "Il Ruanda e la Bolivia hanno più donne che uomini in parlamento",
            },
            {
                question: "Nel 2017, erano di più le persone in estrema povertà che le persone che possedevano un gatto",
                answer: "v",
                funFact: "Il numero di gatti si attesta intorno a 650 milioni, mentre il numero di persone in estrema povertà 696 milioni",
            },
            {
                question: "Continuando così fermeremo il riscaldamento globale a 1.5 C°, come previsto nell’accordo di Parigi",
                answer: "f",
                funFact: "Alla velocità con cui stiamo implementando le misure di sostenibilità, si arriverà ad un massimo di tre gradi",
            },
        ]
    },
    {
        name: "Abete verde",
        id: "1",
        questions: [
            {
                question: "Il processo più dispendioso di carta in Unibo prima del passaggio al digitale era l’orientamento degli studenti delle superiori",
                answer: "v",
                funFact: "Grazie alla dematerializzazione (ossia il passaggio in app!) Unibo risparmia ogni anno 312 alberi!",
            },
            {
                question: "È obbligatorio stampare la propria tesi per potersi laureare con Unibo",
                answer: "f",
                funFact: "Dal 2021 è possibile consegnarle solo in digitale. Questa dematerializzazione risparmia 236 alberi all’anno!",
            },
            {
                question: "Un documento dematerializzato (non su carta ma digitale) è più difficile da archiviare e ritrovare in futuro",
                answer: "f",
                funFact: "Un documento digitale è molto più facile da gestire, soprattutto se sei un’organizzazione grande quanto un’università!",
            },
            {
                question: "Unibo ha risparmiato più carta nel 2022 che in ogni altro anno",
                answer: "v",
                funFact: "Solo nel 2022, Unibo ha risparmiato l’equivalente di 670 alberi di carta!",
            },
            {
                question: "Con la quantità di carta risparmiata nei progetti di dematerializzazione Unibo, si potrebbe coprire la superficie di San Marino",
                answer: "v",
                funFact: "Si arriverebe a coprire 0.83 chilometri quadri, quasi due volte la città del vaticano!",
            },
        ]
    },
]


const localStorageKey = "quizzes"

const calculateXP = (completedQuizzes: number) => 1000 * Math.sqrt(3 * completedQuizzes)

const getCompletedQuizzes = () => JSON.parse(localStorage.getItem(localStorageKey)) ?? []

const setCompletedQuizzes = (completedQuizzes: string[]) => {
    localStorage.setItem(localStorageKey, JSON.stringify(completedQuizzes))

    // archievements section
    if (completedQuizzes.length > 0)
        unlockArchievement("firstquiz")

    if (calculateXP(completedQuizzes.length) >= 3000)
        unlockArchievement("lvl3")

    if (calculateXP(completedQuizzes.length) >= 5000)
        unlockArchievement("lvl5")

    if (calculateXP(completedQuizzes.length) >= 10000)
        unlockArchievement("lvl10")

    if (completedQuizzes.filter(el => bonusCodes.includes(el)).length == bonusCodes.length)
        unlockArchievement("allbonuscodes")
}

export default data

export { getCompletedQuizzes, setCompletedQuizzes, calculateXP }