import makeStyles from "../src/makeStyles"
import { motion, useAnimation, useMotionValue, useTransform } from "framer-motion"

const styles = makeStyles({
    card: {
        position: "absolute",
        backgroundColor: "var(--maincolor)",
        width: "100%",
        height: 350,
        borderRadius: 40,
        padding: 40,
        boxShadow: "0 8px 8px -4px grey",
        fontSize: "1.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center"
    },
    stamp: {
        borderRadius: 5,
        position: "absolute",
        top: 66,
        fontFamily: "BalooBhai2, sans-serif",
        lineHeight: "1.75rem",
        fontSize: "2.25rem"
    },
    trueStamp: {
        border: "5px solid green",
        left: "20%",
        //@ts-ignore
        rotate: -15,
        color: "green"
    },
    falseStamp: {
        border: "5px solid red",
        right: "20%",
        //@ts-ignore
        rotate: 15,
        color: "red"
    }
})

type CardProps = {
    question: string,
    onAnswer: (answer: "v" | "f") => void,
    interactable: boolean,
    onInteract: () => void
}

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
        [0, 0, 0, .5, 1]
    );

    const falseStampOpacity = useTransform(
        motionValue,
        [-200, -150, 0, 150, 200],
        [1, .5, 0, 0, 0]
    );

    return <motion.div
        drag={props.interactable}
        dragConstraints={{ left: -1000, right: 1000 }}
        dragSnapToOrigin={true}
        style={{ ...styles.card, opacity: cardOpacity, rotate: cardRotation, x: motionValue }}
        onDragStart={() => { props.onInteract() }}
        onDragEnd={(event, info) => {

            //if the card is dragged over the threshold, call the callback
            if (Math.abs(info.offset.x) > 130) {
                props.onAnswer(info.offset.x > 0 ? "v" : "f")
            }
        }}
    >
        <motion.div style={{ ...styles.stamp, ...styles.trueStamp, opacity: trueStampOpacity }}>VERO</motion.div>
        <motion.div style={{ ...styles.stamp, ...styles.falseStamp, opacity: falseStampOpacity }}>FALSO</motion.div>
        {props.question}
    </motion.div >
}

export default Card