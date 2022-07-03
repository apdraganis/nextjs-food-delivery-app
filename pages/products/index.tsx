import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'
import Meals from '../../src/components/Meals/Meals'

const Products: NextPage = (props: any) => {

  return (
    <Fragment>
      <Head>
        <title>TypeCream Products</title>
        <meta
          name='description'
          content='Have a look at our delicious ice cream products!'
        />
      </Head>
      <Meals meals={props.meals} />
    </Fragment>
  )
}

export default Products;

export async function getStaticProps() {

  const res = await fetch(`${process.env.DATABASE_URL}/meals.json`);
  const data = await res.json();

  const loadedMeals = [];

  for (const key in data) {
    loadedMeals.push({
      id: key,
      name: data[key].name,
      description: data[key].description,
      price: data[key].price,
    });
  }

  return {
    props: {
      meals: loadedMeals,
      hello: 'world'
    }
  }
};