import type { AppProps } from 'next/app'
import Head from 'next/head'
import Layout from '../components/Layout'
import { theme } from '../src/common'

const MyApp = ({ Component, pageProps }: AppProps) => <>
    <Layout>
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
            `}</style>
        <Component {...pageProps} />
    </Layout>
</>

export default MyApp
