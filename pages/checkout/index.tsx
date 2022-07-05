import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import Checkout from "../../src/components/Cart/Checkout";

interface CheckoutPageProps {
  DB_URL: string
}

const CheckoutPage: NextPage<CheckoutPageProps> = (props: { DB_URL: string }) => {
  const router = useRouter();
  const items = useSelector((state: any) => state.items);
  if (items.length < 1) {
    router.replace('/products')
  }


  return (
    <Fragment>
      <Head>
        <title>TypeCream | Checkout</title>
        <meta
          name='description'
          content='Have a look at our delicious ice cream products!'
        />
      </Head>
      <Checkout url={props.DB_URL} />
    </Fragment>
  )
}

export default CheckoutPage;

export const getStaticProps: GetStaticProps = () => {

  return {
    props: {
      DB_URL: process.env.DATABASE_URL
    }
  }
}