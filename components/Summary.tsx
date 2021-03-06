import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { calculateXP, getCompletedQuizzes, setCompletedQuizzes } from "../src/quizzes"
import makeStyles from "../src/makeStyles"
import { Quiz } from "../src/quizzes"
import { unlockArchievement } from "../src/archievements"
import { motion } from "framer-motion"

const styles = makeStyles({
    noMtop: { marginTop: 0 },
    cardImage: {
        margin: 0,
        height: 100
    },
    questionCounter: {
        fontFamily: "BalooBhai2, sans-serif",
        marginBottom: 0,
        fontSize: "1.25rem"
    },
    lastCard: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        textAlign: "center",
        padding: 40
    },
    summaryCard: {
        position: "relative",
        backgroundColor: "var(--maincolor)",
        width: "80%",
        height: 500,
        borderRadius: 40,
        boxShadow: "0 8px 8px -4px grey",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
    },
    topSummaryCard: {
        position: "absolute",
        top: 10,
        bottom: "40%",
        left: 0,
        right: 0,
        // fontSize: "1.1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        textAlign: "center",
        padding: "30px 40px",
        paddingBottom: 10,
        letterSpacing: ".4px",
        // lineHeight: "1.2rem"
    },
    bottomSummaryCard: {
        position: "absolute",
        top: "60%",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "var(--cardcolor)",
        borderRadius: "0px 0px 40px 40px",
        fontSize: "1.05rem",
        letterSpacing: ".4px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: 30
    },
    storyIndexHolder: {
        display: "flex",
        flexDirection: "row-reverse",
        alignItems: "stretch",
        position: "absolute",
        top: 7, left: 40, right: 40, height: 3
    },
    lastCardLink: {
        display: "block",
        fontFamily: "'Baloo 2', sans-serif",
        textDecoration: "underline black"
    }
})

const Summary = ({ data, playerAnswers, success }: { data: Quiz, playerAnswers: ("unanswered" | "v" | "f")[], success: boolean }) => {
    const [index, setQuestionIndex] = useState(data.questions.length - 1)
    const [showTutorial, setShowTutorial] = useState(true)

    const onClick = (ev) => {
        const clickPercent = (ev.clientX - summaryCardRef.current.getBoundingClientRect().left) / summaryCardRef.current.offsetWidth
        if (clickPercent < .3) {
            setShowTutorial(false)
            setQuestionIndex((index) => Math.min(data.questions.length - 1, index + 1))
        }
        if (clickPercent > .6) {
            setShowTutorial(false)
            setQuestionIndex((index) => Math.max(-1, index - 1))
        }
    }

    const summaryCardRef = useRef<HTMLDivElement>()
    return <>
        <div>
            <h1 style={styles.noMtop}>{data.name}</h1>
            <img draggable="false" style={styles.cardImage} src="/img/log.webp" alt="" />
        </div>

        <div ref={summaryCardRef} style={styles.summaryCard} onClick={onClick}>
            {showTutorial &&
                <motion.img
                    animate={{ opacity: [0, 1, 1, 1, 0], scale: [1, 1, .9, 1, 1] }}
                    transition={{ repeat: Infinity, delay: 4, repeatDelay: 2, duration: 1 }}
                    style={{ position: "absolute", width: 80, zIndex: 10, top: "20%", right: -20 }}
                    src="/img/hand.webp" alt="" />}
            <div style={styles.storyIndexHolder}>

                {Array.from(Array(data.questions.length + 1))
                    .map((el, i) =>
                        <div
                            key={i - 1}
                            style={{
                                backgroundColor: index == i - 1 ? "black" : "white",
                                flex: 1,
                                marginLeft: 5,
                                marginRight: 5
                            }}
                        />)}
            </div>

            {index != -1 && <>
                <div style={styles.topSummaryCard}>
                    <div>
                        {data.questions[index].question}
                    </div>
                    <div>

                        <div style={{ marginBottom: 10 }}>
                            Hai risposto: <strong>{playerAnswers[index] == "v" ? "vero" : "falso"}</strong>
                        </div>
                        <img draggable="false" height={50} src={data.questions[index].answer == playerAnswers[index] ? "/img/check.webp" : "/img/cross.webp"} alt="" />
                    </div>
                </div>

                <div style={styles.bottomSummaryCard}>

                    {data.questions[index].funFact}
                </div>
            </>}

            {index == -1 && <div style={styles.lastCard}>
                <h2 style={{ fontSize: "1.8rem", lineHeight: "2rem" }}>
                    {success
                        ? "Hai completato il Quizbero!"
                        : "Ritenta..."}
                </h2>
                <ExperienceBar id={data.id} success={success} />
                <div>
                    <a onClick={async () => {
                        if (success)
                            unlockArchievement("sharewin")
                        else
                            unlockArchievement("shareloss")
                        try {
                            await navigator.share({
                                text: success
                                    ? 'Ho appena completato un Quizbero! Riesci a battermi? Scoprilo su quizbero.it'
                                    : 'Non sono riuscito a completare un Quizbero! Riesci a darmi una mano? Scoprilo su quizbero.it'
                            })
                        } catch (e) { }
                    }} style={{ ...styles.lastCardLink, fontSize: "2rem" }}>Condividi</a>
                    <Link href="/profile">
                        <a style={{ ...styles.lastCardLink, fontSize: "1.25rem" }}>Vai al profilo</a>
                    </Link>
                </div>
            </div>}
        </div>
    </>
}

const ExperienceBar = ({ id, success }: { id: string, success: boolean }) => {

    const completedQuizzes = getCompletedQuizzes()

    const savedXp = calculateXP(completedQuizzes.length)

    const [xp, setXp] = useState(savedXp)
    const [animate, setAnimate] = useState(true)
    const barPercent = xp % 1000 / 10
    const level = Math.floor(xp / 1000)

    const fakeDeltaXp = success ? 200 : 0

    if (success)
        // add the quiz id to the array if not present already
        if (!completedQuizzes.includes(id))
            completedQuizzes.push(id)

    setCompletedQuizzes(completedQuizzes)

    const newXp = calculateXP(completedQuizzes.length)
    const newLevel = Math.floor(newXp / 1000)


    useEffect(() => {
        if (newXp != xp) {
            if (newLevel != level) {
                // first animate up to the end of the current level
                setXp(level * 1000 + 999)

                setTimeout(() => {
                    // then reset the bar at the start of the next level
                    setAnimate(false)
                    setXp(newLevel * 1000)

                    setTimeout(() => {
                        // then animate up to the new xp level
                        setAnimate(true)
                        setXp(newXp)
                    }, 200);
                }, 1000);
            } else {
                setXp(newXp)
            }
        }
    }, [])


    return <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div>+{fakeDeltaXp}xp</div>
        <div style={{ width: "90%", height: 30, backgroundColor: "#385682", borderRadius: 100, overflow: "hidden" }}>
            <div style={{ transition: animate ? "all 1s" : "none", width: barPercent + "%", height: 30, backgroundColor: "#5297ff", borderRadius: 100 }}>

            </div>
        </div>
        <div>Livello {level}</div>
    </div>
}

export default Summary