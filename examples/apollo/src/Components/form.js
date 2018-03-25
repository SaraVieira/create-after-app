import React from "react";
import { Mutation } from "react-apollo";
import { withState } from "recompose";
import { GET_NAMES, ADD_NAME } from "../queries.js";

const updateCache = (cache, { data: { createNames } }) => {
  const { allNameses } = cache.readQuery({ query: GET_NAMES });
  cache.writeQuery({
    query: GET_NAMES,
    data: {
      allNameses: allNameses.concat(createNames)
    }
  });
};

const enhance = withState("name", "setName", "");
export default enhance(({ name, setName }) => (
  <div className="black-80 center dib">
    <Mutation mutation={ADD_NAME} update={updateCache}>
      {(createNames, attrs = {}) => (
        <form
          className="pa4 black-80"
          onSubmit={async e => {
            e.preventDefault();
            await createNames({ variables: { name } });
            setName("");
          }}
        >
          <div className="measure">
            <label htmlFor="name" className="avenir f6 b db mb2">
              Name
            </label>
            <input
              id="name"
              className="avenir input-reset ba b--black-20 pa2 mb2 db w-100"
              type="text"
              value={attrs.loading ? "loading..." : name}
              aria-describedby="name-desc"
              onChange={e => setName(e.target.value)}
            />
          </div>
        </form>
      )}
    </Mutation>
  </div>
));
