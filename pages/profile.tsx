import { motion } from 'framer-motion'
import { Router, useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { getArchievements, unlockArchievement } from '../src/archievements'
import { commonStyles } from '../src/common'
import getBonusCode, { bonusCodes } from '../src/getBonusCode'
import makeStyles from '../src/makeStyles'
import { calculateXP, getCompletedQuizzes } from '../src/quizzes'

const styles = makeStyles({
    archievement: {
        backgroundColor: "var(--cardcolor)",
        borderRadius: 20,
        padding: 30,
        border: "none",
        boxShadow: "0 8px 8px -4px grey",
        lineHeight: "1.5rem",
        display: "flex",
        fontWeight: "bold",
        width: "100%",
        margin: "10px 0px",
        alignItems: "center",
        textAlign: "start",
    }
})

const Archievement = ({ completed, desc }: { completed: boolean, desc: string }) => <div style={styles.archievement}>
    <img style={{ marginRight: 15 }} width={30} height={30} src={completed ? "/img/check.webp" : "/img/cross.webp"} alt="" />
    {desc}
</div>

const Profile = () => {

    const [browser, setBrowser] = useState(false)
    const [bonusCode, setBonusCode] = useState("")
    const [showForm, setShowForm] = useState(false)
    const [inputContent, setInputContent] = useState("")
    const [formMessage, setFormMessage] = useState("")
    const [easterEggCounter, setEasterEggCounter] = useState(0)
    const router = useRouter()


    useEffect(() => {
        setBrowser(true)
    })

    useEffect(() => {
        if (easterEggCounter > 4) {
            unlockArchievement("easteregg")
            router.push("/easteregg")
        }
    })

    useEffect(() => {
        if (browser) {
            getBonusCode().then(code => setBonusCode(code + ""))
        }
    }, [browser])

    const xp = browser
        ? calculateXP(getCompletedQuizzes().length)
        : 0

    return <Layout animateKey="profile">

        <div style={{
            margin: "0px 40px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            textAlign: "center",
        }}>
            <h1>Profilo</h1>
            <img onClick={() => setEasterEggCounter(i => i + 1)} style={{ margin: 20 }} height={100} src="/img/profilepic.webp" alt="" />

            <div style={{ margin: "30px 0px", width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ width: "90%", height: 30, backgroundColor: "#385682", borderRadius: 100, overflow: "hidden" }}>
                    <div style={{ transition: "all 1s", width: (xp % 1000) / 10 + "%", height: 30, backgroundColor: "#5297ff", borderRadius: 100 }}>

                    </div>
                </div>
                <div style={{ fontWeight: "bold", marginTop: 20 }}>Livello {Math.floor(xp / 1000)}</div>
            </div>
            <h2>Codice bonus</h2>
            <p style={{ ...styles.archievement, fontWeight: "normal" }}>Inserisci i codici bonus dei tuoi amici per sbloccare quiz esclusivi!</p>
            <div style={{ fontSize: "1.25rem", margin: 20 }}>
                <div>Il tuo codice bonus:</div>
                <strong style={{ userSelect: "text" }}>{bonusCode}</strong>
            </div>

            <button onClick={async () => {
                unlockArchievement("copybonuscode")
                try {
                    await navigator.clipboard.writeText(bonusCode)
                } catch (e) { }
            }} style={commonStyles.orangeButton}>COPIA</button>
            <button onClick={() => setShowForm(el => !el)} style={commonStyles.orangeButton}>INSERISCI</button>

            {showForm &&
                <div>
                    <style jsx>{`
                * {
                    border-radius: 10px;
                    border: none;
                    margin: 5px;
                    min-height: 1.5rem;
                    min-width: 2rem;
                }
                `}</style>
                    <input onChange={el => setInputContent(el.target.value)} type="text" name="" id="" />
                    <button onClick={() => {
                        if (bonusCodes.includes(inputContent)) {
                            setFormMessage("Codice inserito corretto! 🤩 Attendi...")
                            unlockArchievement("bonuscode")
                            setTimeout(() => {
                                router.push("/" + inputContent)
                            }, 1000);
                        } else {
                            setFormMessage("Codice inserito non corretto 😢")
                        }
                    }}>ok</button>
                    <div>{formMessage}</div>
                </div>
            }

            <h2>Obiettivi</h2>

            {browser &&
                // nascondi gli archievement segreti a meno che non siano stati completati
                getArchievements().map(el => el.hidden && !el.unlocked ? { ...el, name: "????????" } : el)
                    .map(el => <Archievement key={el.id} desc={el.name} completed={el.unlocked} />)}

        </div>
    </Layout>

}

export default Profile
