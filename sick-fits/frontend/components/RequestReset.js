import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Form from "./styles/Form";
import Error from "./ErrorMessage";

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;

const state = {
  email: "",
};

const saveToState = (e) => {
  state.name = e.target.value;
  //setState({ [e.target.name]: e.target.value });
};

function RequestReset() {
  return (
    <Mutation mutation={REQUEST_RESET_MUTATION} variables={state}>
      {(reset, { error, loading, called }) => {
        return (
          <Form
            method="post"
            onSubmit={async (e) => {
              e.preventDefault();
              await reset();
              state = {
                email: "",
              };
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Request a password reset</h2>
              <Error error={error} />
              {!error && !loading && called && (
                <p>Success! check your email for a reset link!</p>
              )}
              <label htmlFor="email">
                Email
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  value={state.email}
                  onChange={saveToState}
                ></input>
              </label>
              <button type="submit">Request Reset</button>
            </fieldset>
          </Form>
        );
      }}
    </Mutation>
  );
}

export default RequestReset;
