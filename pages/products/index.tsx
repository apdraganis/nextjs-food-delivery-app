import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'
import Meals from '../../src/components/Meals/Meals'

const Products: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>TypeCream Products</title>
        <meta
          name='description'
          content='Have a look at our delicious ice cream products!'
        />
      </Head>
      <Meals />
    </Fragment>
  )
}

export default Products;