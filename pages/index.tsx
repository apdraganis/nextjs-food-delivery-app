import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Fragment } from 'react'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>TypeCream</title>
        <meta
          name='description'
          content='Endless ice cream choices to make your day!'
        />
      </Head>
      <main>
        hi
      </main>
    </Fragment>
  )
}

export default Home
