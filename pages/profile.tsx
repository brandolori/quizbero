import dynamic from 'next/dynamic'
import { commonStyles } from '../src/common'
import makeStyles from '../src/makeStyles'

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

const ArchievementsList = dynamic(() => import("../components/ArchievementsList"), { ssr: false })

const Home = () => {

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
                <div style={{ width: "30%", height: 30, backgroundColor: "#5297ff", borderRadius: 100 }}>

                </div>
            </div>
            <div style={{ fontWeight: "bold", marginTop: 20 }}>Livello 10</div>
        </div>
        <h2>Codice bonus</h2>
        <p style={{ ...styles.archievement, fontWeight: "normal" }}>Inserisci i codici bonus dei tuoi amici per sbloccare quiz esclusivi!</p>
        <div style={{ fontSize: "1.25rem", margin: 20 }}>
            <div>Il tuo codice bonus:</div>
            <strong style={{ userSelect: "text" }}>ae3a7694</strong>
        </div>

        <button style={commonStyles.orangeButton}>COPIA</button>
        <button style={commonStyles.orangeButton}>INSERISCI</button>

        <h2>Obiettivi</h2>
        <ArchievementsList />

    </div>
}

export default Home