import { AnimatePresence } from 'framer-motion'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { registerOrReplaceArchievementsListener } from '../src/archievements'
import { theme } from '../src/common'
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
        margin: "10px 0px",
        alignItems: "center",
        textAlign: "start",
        position: "fixed",
        top: 50,
        left: 20,
        right: 20,
        maxWidth: 576,
        transition: "all 1s",
        zIndex: 100
    }
})

const Archievement = ({ desc }: { desc: string }) => <div style={styles.archievement}>
    <img style={{ marginRight: 15 }} width={30} height={30} src="/img/check.webp" alt="" />
    <div>

        <small style={{ fontWeight: "normal" }}>
            Archievement sbloccato!
        </small>
        <div>

            {desc}
        </div>
    </div>
</div>

const MyApp = ({ Component, pageProps }: AppProps) => {

    const [archievement, setArchievement] = useState("")
    const [showArchievement, setShowArchievement] = useState(false)
    useEffect(() => {
        registerOrReplaceArchievementsListener((name) => {
            setArchievement(name)
            setShowArchievement(true)
            setTimeout(() => {
                setShowArchievement(false)
            }, 4000)
        })
    })

    return <>
        <style jsx global>{`
            :root {
                --maincolor: ${theme.mainColor};
                --backgroundcolor: ${theme.backgroundColor};
                --baloocolor: ${theme.balooColor};
                --cardcolor: ${theme.cardColor};
            }

            #__next {
                position: absolute;
                top: 0px;
                bottom: 0px;
                left: 0px;
                right: 0px;
            }
              
            html {
                font-size: 1.25rem;
                background-color: var(--backgroundcolor);
            }
              
            * {
                color: black;
                font-family: Carme, sans-serif;
                box-sizing: border-box;
                user-select: none;
            }
            
            h1 {
                font-size: 2.5rem;
                line-height: 2.25rem;
            }

            h2 {
                font-size: 1.75rem;
                line-height: 1.75rem;
            }

            h1,
            h2,
            h3,
            h4,
            button {
                font-family: 'Baloo 2', cursive;
                color: var(--baloocolor);
            }

            button, a {
                cursor: pointer;
            }
            `}</style>

        <div style={{ ...styles.archievement, opacity: showArchievement ? 1 : 0 }}>
            <img style={{ marginRight: 15 }} width={30} height={30} src="/img/check.webp" alt="" />
            <div>

                <small style={{ fontWeight: "normal" }}>
                    Archievement sbloccato!
                </small>
                <div>

                    {archievement}
                </div>
            </div>
        </div>
        <AnimatePresence>

            <Component {...pageProps} />
        </AnimatePresence>
    </>
}

export default MyApp
