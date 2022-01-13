import Head from 'next/head'
import Layout from '../components/Layout'
import { ChakraProvider } from '@chakra-ui/react'

// import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head></Head>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </>
  )
}

export default MyApp
