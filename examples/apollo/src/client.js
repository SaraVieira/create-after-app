import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ensureReady, After } from "@jaredpalmer/after";
import { injectGlobal } from "styled-components";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import "tachyons";
import routes from "./routes";

injectGlobal`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

const client = new ApolloClient({
  uri: "https://api.graph.cool/simple/v1/cjexem1he3let0153tpc5ftu1"
});

ensureReady(routes).then(data =>
  hydrate(
    <BrowserRouter>
      <ApolloProvider client={client}>
        <After data={data} routes={routes} />
      </ApolloProvider>
    </BrowserRouter>,
    document.getElementById("root")
  )
);

if (module.hot) {
  module.hot.accept();
}
