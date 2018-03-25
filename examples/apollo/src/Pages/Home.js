import React, { Component } from "react";
import styled from "styled-components";
import Header from "../Components/header";
import { Query, Mutation } from "react-apollo";
import { GET_NAMES, DELETE_NAME } from "../queries.js";
import Form from "../Components/form";

const Main = styled.main`
  text-align: center;
`;

const updateCache = (cache, { data: { deleteNames } }) => {
  const { allNameses } = cache.readQuery({ query: GET_NAMES });
  cache.writeQuery({
    query: GET_NAMES,
    data: {
      allNameses: allNameses.filter(n => n.id !== deleteNames.id)
    }
  });
};

class Home extends Component {
  static async getInitialProps({ req, res, match, history, location, ...ctx }) {
    return { stuff: "whatevs" };
  }
  render() {
    return (
      <Main>
        <Header />
        <h1 className="avenir f4 bold center mw5">Add A Person</h1>
        <Form />
        <h1 className="avenir f4 bold center mw5">Names</h1>
        <ul className="avenir list pl0 ml0 center mw5 ba b--light-silver br3">
          <Query query={GET_NAMES}>
            {({ loading, error, data: { allNameses } }) => {
              if (loading) return "Loading";
              if (error) return <div>Error :(</div>;
              return allNameses.map(({ name, id }) => (
                <li className="avenir ph3 pv2 bb b--light-silver" key={id}>
                  {name}
                  <Mutation update={updateCache} mutation={DELETE_NAME}>
                    {(deleteNames, attrs = {}) => {
                      return (
                        <span
                          className="fr red pointer"
                          onClick={e => {
                            e.preventDefault();
                            deleteNames({ variables: { id } });
                          }}
                        >
                          {attrs.loading ? "loading" : "x"}
                        </span>
                      );
                    }}
                  </Mutation>
                </li>
              ));
            }}
          </Query>
        </ul>
      </Main>
    );
  }
}

export default Home;
