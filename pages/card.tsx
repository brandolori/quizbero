import makeStyles from "../src/makeStyles"
import { motion, useAnimation, useMotionValue, useTransform } from "framer-motion"
import { useState } from "react"

const styles = makeStyles({
    card: {
        position: "absolute",
        backgroundColor: "var(--maincolor)",
        width: "100%",
        height: 400,
        borderRadius: 40,
        padding: 40,
        boxShadow: "0 8px 8px -4px grey",
        fontSize: "1.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    cardHolder: {
        position: "relative",
        width: "80%",
        height: 400,
        overflow: "visible",
        margin: "auto",
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
        justifyContent: "center",
        minHeight: "100%"
    },
    stamp: {
        borderRadius: 5,
        position: "absolute",
        top: 100,
        fontFamily: "BalooBhai2, sans-serif",
        lineHeight: "1.66rem",
        fontSize: "2rem"
    },
    trueStamp: {
        border: "5px solid green",
        left: "25%",
        //@ts-ignore
        rotate: -15,
        color: "green"
    },
    falseStamp: {
        border: "5px solid red",
        right: "25%",
        //@ts-ignore
        rotate: 15,
        color: "red"
    }
})

type CardProps = { question: string, onAnswer: (answer: "v" | "f") => void }

const Card = (props: CardProps) => {
    const motionValue = useMotionValue(0);

    // To rotate the card as the card moves on drag
    const cardRotation = useTransform(motionValue, [-200, 200], [-30, 30]);

    const cardOpacity = useTransform(
        motionValue,
        [-200, -150, 0, 150, 200],
        [0, 1, 1, 1, 0]
    );

    const trueStampOpacity = useTransform(
        motionValue,
        [-200, -150, 0, 150, 200],
        [0, 0, 0, .2, 1]
    );

    const falseStampOpacity = useTransform(
        motionValue,
        [-200, -150, 0, 150, 200],
        [1, .2, 0, 0, 0]
    );

    return <motion.div
        drag="x"
        dragConstraints={{ left: -1000, right: 1000 }}
        dragSnapToOrigin={true}
        style={{ ...styles.card, opacity: cardOpacity, rotate: cardRotation, x: motionValue }}
        onDragEnd={(event, info) => {
            // If the card is dragged only upto 150 on x-axis
            // bring it back to initial position
            if (Math.abs(info.offset.x) > 200) {
                props.onAnswer(info.offset.x > 0 ? "v" : "f")
            }
        }}
    >
        <motion.div style={{ ...styles.stamp, ...styles.trueStamp, opacity: trueStampOpacity }}>VERO</motion.div>
        <motion.div style={{ ...styles.stamp, ...styles.falseStamp, opacity: falseStampOpacity }}>FALSO</motion.div>
        {props.question}
    </motion.div >
}

export default () => {

    const [arr, setArr] = useState<("visible" | "invisible")[]>(["visible", "visible"])
    return <div style={styles.container}>
        <h1>Quercia Verde</h1>
        <div style={styles.cardHolder}>
            {
                arr.map((el, i) =>
                    el == "visible" && <Card key={i}
                        question={"pipo" + i}
                        onAnswer={() => {
                            setArr(a => a.map((el, index) => index == i ? "invisible" : el))
                        }}
                    />
                )
            }
        </div>
        <h3>1 di 4</h3>
    </div>;
}