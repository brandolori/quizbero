import { useEffect, useState } from "react"
import Card from "./Card"

const tutorialKey = "tutorial"

const getCompleted = () => JSON.parse(localStorage.getItem(tutorialKey)) ?? false

const Tutorial = ({ onInteract, onComplete }: { onInteract: () => void, onComplete: () => void }) => {

    const [left, setLeft] = useState(true)
    const [right, setRight] = useState(true)

    useEffect(() => {
        const completed = getCompleted()
        if (completed)
            onComplete()
        setLeft(!completed)
        setRight(!completed)
    }, [])

    useEffect(() => {
        localStorage.setItem(tutorialKey, JSON.stringify(true))
    }, [left, right])

    return <>
        {left &&
            <Card
                interactable={!right}
                onAnswer={(ans) => {
                    if (ans == "f") {
                        setLeft(false)

                        localStorage.setItem(tutorialKey, JSON.stringify(true))
                        onComplete()
                    }

                }}
                onInteract={onInteract}
                question="Scorri a sinistra per rispondere Falso! ⬅️"
            />
        }
        {right &&
            <Card
                interactable={true}
                onAnswer={(ans) => {
                    if (ans == "v")
                        setRight(false)
                }}
                onInteract={onInteract}
                question="Scorri a destra per rispondere Vero! ➡️"
            />
        }
    </>
}

export default Tutorial