import type { NextPage } from 'next'
import makeStyles from '../src/makeStyles'

const styles = makeStyles({
    p: {
        width: "50%",
        textAlign: "initial"
    }
})

const Home: NextPage = () =>  <img src="/img/easter.webp" alt="" />

export default Home
