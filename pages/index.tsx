import type { NextPage } from 'next'
import Link from 'next/link'
import { commonStyles } from '../src/common'
import makeStyles from '../src/makeStyles'

const styles = makeStyles({
    p: {
        width: "50%",
        textAlign: "initial"
    }
})

const Home: NextPage = () => <div style={{
    margin:"0px 40px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    textAlign: "center",
}}>
    <style jsx>{`
    p, h2 {
        text-align: initial;
        width: 100%
    }

    img {
        margin: 20px;
    }

    `}</style>
    <h1>Quizbero!</h1>
    <img height={150} src="/img/log.webp" alt="" />
    <h2>Cosa sono?</h2>
    <p >Piccoli quiz che ti accompagneranno alla scoperta del processo di dematerializzazione di Unibo</p>
    <h2>Dove li trovo?</h2>
    <p >Fra gli alberi del campus di Cesena troverai dei Qr Code</p>
    <img src="/img/qr.webp" alt="" />
    <p >Scannerizzali e guarda cosa succede!</p>
    <h2>Hai già completato dei Quizberi?</h2>
    <Link href="/profile">
        <button style={commonStyles.orangeButton}>VAI AL PROFILO</button>
    </Link>

</div>

export default Home
