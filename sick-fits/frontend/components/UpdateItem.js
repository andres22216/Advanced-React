import React, { useState, memo } from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import Form from "./styles/Form";
import formatMoney from "../lib/formatMoney";
import Error from "./ErrorMessage";
import Router from "next/router";

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
    }
  }
`;

const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $id: ID!
    $title: String
    $description: String
    $price: Int
  ) {
    updateItem(
      id: $id
      title: $title
      description: $description
      price: $price
    ) {
      id
      title
      description
      price
    }
  }
`;

function UpdateItem(props) {
  const [item, setItem] = useState({});

  const handleChange = (e) => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    setItem({ ...item, [name]: val });
  };

  const updateItem = async (e, updateItemMutation) => {
    e.preventDefault();
    console.log("Updating Item!!");
    const res = await updateItemMutation({
      variables: {
        id: props.id,
        ...item,
      },
    });
    console.log("Updated!!");
  };

  return (
    <Query
      query={SINGLE_ITEM_QUERY}
      variables={{
        id: props.id,
      }}
    >
      {({ data, loading }) => {
        if (loading) return <p>Loading...</p>;
        if (!data.item) return <p>No Item Found for ID {props.id}</p>;
        return (
          <Mutation mutation={UPDATE_ITEM_MUTATION}>
            {(updateItem, { loading, error }) => (
              <Form onSubmit={(e) => updateItem(e, updateItem)}>
                <Error error={error}></Error>
                <fieldset disabled={loading} aria-busy={loading}>
                  <label htmlFor="title">
                    Title
                    <input
                      type="text"
                      id="title"
                      name="title"
                      placeholder="Title"
                      required
                      defaultValue={data.item.title}
                      onChange={handleChange}
                    ></input>
                  </label>

                  <label htmlFor="price">
                    Price
                    <input
                      type="number"
                      id="price"
                      name="price"
                      placeholder="Price"
                      required
                      defaultValue={data.item.price}
                      onChange={handleChange}
                    ></input>
                  </label>

                  <label htmlFor="description">
                    Description
                    <textarea
                      id="description"
                      name="description"
                      placeholder="Enter A Description"
                      required
                      defaultValue={data.item.title}
                      onChange={handleChange}
                    ></textarea>
                  </label>
                  <button type="submit">
                    Sav{loading ? "ing" : "e"} changes
                  </button>
                </fieldset>
              </Form>
            )}
          </Mutation>
        );
      }}
    </Query>
  );
}

export default memo(UpdateItem);
export { UPDATE_ITEM_MUTATION };
