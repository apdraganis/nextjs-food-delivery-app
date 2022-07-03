import { NextPage } from "next";
import Head from "next/head";
import { Fragment } from "react";
import Checkout from "../../src/components/Cart/Checkout";

const CheckoutPage: NextPage = (props: any) => {
  return (
    <Fragment>
      <Head>
        <title>TypeCream Products</title>
        <meta
          name='description'
          content='Have a look at our delicious ice cream products!'
        />
      </Head>
      <Checkout />
    </Fragment>
  )
}

export default CheckoutPage;