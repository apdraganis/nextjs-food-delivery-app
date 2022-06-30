import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { Fragment } from 'react'
import Nav from '../src/components/Layout/Nav'
import styles from '../styles/Home.module.scss'

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>TypeCream | Home</title>
        <meta
          name='description'
          content='Endless ice cream choices to make your day!'
        />
      </Head>
      <main className={styles.content}>
        <h1>TypeCream</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit iusto autem eos quisquam nam, nemo modi at libero tempora quis numquam. Modi corporis quae itaque nemo suscipit, recusandae praesentium odio.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur eum vel laudantium expedita. Porro, quaerat provident natus necessitatibus deserunt facilis.</p>
        <Link href='./products'>View Products</Link>
      </main>
    </>
  )
}

export default HomePage;
