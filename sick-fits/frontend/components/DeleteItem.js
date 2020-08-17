import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { ALL_ITEMS_QUERY } from "./Items";

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

function DeleteItem(props) {
  //asi no funciona
  //return <button>{this.props.children}</button>;
  //console.log("PROPS ID " + props.id);
  const update = (cache, payload) => {
    //manually update the cache on the client
    //Read the cache for the items we want
    const data = cache.readQuery({
      query: ALL_ITEMS_QUERY,
    });
    console.log(data);
    //filter the deleted itemout of the page
    data.items = data.items.filter(
      (item) => item.id !== payload.data.deleteItem.id
    );
    //put the items back
    cache.writeQuery({ query: ALL_ITEMS_QUERY, data });
  };

  return (
    <Mutation
      mutation={DELETE_ITEM_MUTATION}
      variables={{
        id: props.id,
      }}
      update={update}
    >
      {(deleteItem, { error }) => (
        <button
          onClick={() => {
            if (confirm("Are you sure want to delete this item?")) {
              deleteItem();
            }
          }}
        >
          {props.children}
        </button>
      )}
    </Mutation>
  );
}

export default DeleteItem;
