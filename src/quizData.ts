type Question = {
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
                question: "I papaveri sono alti alti alti?",
                answer: "v",
                funFact: "Fun fact 1!",
            },
            {
                question: "Tu sei piccolina?",
                answer: "f",
                funFact: "Fun fact 2!",
            },
            {
                question: "Sei nata paperina?",
                answer: "f",
                funFact: "Fun fact 3!",
            }
        ]
    }
]

export default data