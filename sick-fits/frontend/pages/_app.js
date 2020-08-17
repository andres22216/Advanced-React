import React from "react";
import Layout from "../components/Layout";
import { ApolloProvider } from "react-apollo";
import withData from "../lib/withData";

function MyApp({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
      <Layout>
        <Component {...pageProps}></Component>
      </Layout>
    </ApolloProvider>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  //expone el query para el usuario
  pageProps.query = ctx.query;
  return { pageProps };
};

export default withData(MyApp);
