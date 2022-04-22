import type { AppProps } from 'next/app'
import Head from 'next/head'
import Layout from '../components/Layout'
import { theme } from '../src/common'
import { GoogleFonts } from "nextjs-google-fonts/GoogleFonts";

const MyApp = ({ Component, pageProps }: AppProps) => <>
  <Head>
    <link rel="manifest" href="/manifest.json" />
    <link rel="apple-touch-icon" href="/icons/192.png" />
    <meta name="theme-color" content={theme.mainColor} />
    {GoogleFonts()}
  </Head>
  <Layout>
    <style jsx global>{`
            :root {
              --maincolor: ${theme.mainColor};
              --backgroundcolor: ${theme.backgroundColor};
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
                font-family: Carme, serif;
              }
              
              h1,
              h2,
              h3,
              h4 {
                font-family: 'BalooBhai2', sans-serif;
                color: var(--maincolor);
              }
              
              p,
              ol * {
                text-shadow:
                    0px 0px 8px var(--backgroundcolor),
                    0px 0px 8px var(--backgroundcolor);
            }
            
            pre {
                overflow-x: scroll;
                background-color: #1a1a1ace;
                padding: 2rem;
                border-radius: 8px;
              }
              `}</style>
    <Component {...pageProps} />
  </Layout>
</>

export default MyApp
