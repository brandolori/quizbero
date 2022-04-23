import { motion, Variants } from "framer-motion"
import { useEffect, useState } from "react"
import { commonStyles } from "../src/common"

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
            style={commonStyles.orangeButton} onClick={onButtonClick}>AVANTI
        </motion.button>
    </>
}

export default Reveal