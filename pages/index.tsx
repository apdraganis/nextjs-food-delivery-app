import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
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
        <h2>Cholesterol hates it. You’ll love it.</h2>
        <div>
          <p>
            Jokes aside, TypeCream is made exclusively with high-quality ingredients and low calorie sugar substitutes!
          </p>
          <p>Take a look at our endless menu and when you feel ready use our application to place your order!</p>
        </div>
        <Link href='./products'>View Products</Link>
      </main>
    </>
  )
}

export default HomePage;