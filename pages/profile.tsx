import { useEffect, useState } from 'react'
import { getArchievements } from '../src/archievements'
import { commonStyles } from '../src/common'
import getBonusCode from '../src/getBonusCode'
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
    <img style={{ marginRight: 15 }} width={30} height={30} src={completed ? "/img/check.png" : "/img/cross.png"} alt="" />
    {desc}
</div>

const Home = () => {

    const [browser, setBrowser] = useState(false)
    const [bonusCode, setBonusCode] = useState("")


    useEffect(() => {
        setBrowser(true)
    })

    useEffect(() => {
        if (browser) {
            getBonusCode().then(code => setBonusCode(code + ""))
        }
    }, [browser])

    const xp = browser
        ? calculateXP(getCompletedQuizzes().length)
        : 0

    return <div style={{
        margin: "0px 40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        textAlign: "center",
    }}>
        <h1>Profilo</h1>
        <img style={{ margin: 20 }} height={100} src="/img/profilepic.png" alt="" />

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
            try {
                await navigator.clipboard.writeText(bonusCode)
            } catch (e) { }
        }} style={commonStyles.orangeButton}>COPIA</button>
        <button style={commonStyles.orangeButton}>INSERISCI</button>

        <h2>Obiettivi</h2>

        {browser &&
            getArchievements().map(el => <Archievement key={el.id} desc={el.name} completed={el.unlocked} />)}

    </div>
}

export default Home
