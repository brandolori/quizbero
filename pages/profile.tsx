import type { NextPage } from 'next'
import Link from 'next/link'
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

const Archievement = ({ completed, desc }: { completed: boolean, desc: string }) => <div style={styles.archievement}>
    <img style={{ marginRight: 15 }} width={30} height={30} src={completed ? "/img/check.png" : "/img/cross.png"} alt="" />
    {desc}
</div>

const Home: NextPage = () => <div style={{
    padding: 40,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    textAlign: "center",
}}>
    <h1>Profilo</h1>
    <img style={{ margin: 40 }} height={100} src="/img/profilepic.png" alt="" />
    <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ width: "90%", height: 30, backgroundColor: "#385682", borderRadius: 100, overflow: "hidden" }}>
            <div style={{ width: "30%", height: 30, backgroundColor: "#5297ff", borderRadius: 100 }}>

            </div>
        </div>
        <div>Livello 10</div>
    </div>
    <h2>Codice bonus</h2>
    <p style={{ ...styles.archievement, fontWeight: "normal" }}>Inserisci il codice bonus dei tuoi amici per sbloccare quiz esclusivi!</p>
    <p style={{fontSize:"1.25rem"}}>
        <div>Il tuo codice bonus:</div>
        <strong>ae3a7694</strong>
    </p>

    <button style={commonStyles.orangeButton}>COPIA</button>
    <button style={commonStyles.orangeButton}>INSERISCI</button>

    <h2>Obiettivi</h2>
    <Archievement desc='raggiungi il livello 5' completed={false} />
    <Archievement desc='vinci' completed={true} />
    <Archievement desc='porta in alto la mano, segui il tuo capitano' completed={true} />

</div>

export default Home
