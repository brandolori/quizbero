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

const Home: NextPage = () =>  <img src="/img/easter.png" alt="" />

export default Home
