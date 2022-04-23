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
    }
]

export default data