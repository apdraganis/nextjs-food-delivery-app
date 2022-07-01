import { NextPage } from "next";
import Head from "next/head";
import { Fragment } from "react";
import AuthForm from "../../src/components/Auth/AuthForm";

const AuthPage: NextPage = (props: any) => {
  console.log(props.apiKey)

  return (
    <Fragment>
      <Head>
        <title>TypeCream | Sign In or Create An Account</title>
        <meta
          name='description'
          content='Become a member to get discounts!'
        />
      </Head>
      <AuthForm />
    </Fragment>
  );
};

export default AuthPage;

export async function getStaticProps() {
  console.log(process.env.API_KEY)
  return {
    props: {
      apiKey: process.env.API_KEY
    }
  }
}