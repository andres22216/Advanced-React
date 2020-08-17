import React, { useState, memo } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Form from "./styles/Form";
import formatMoney from "../lib/formatMoney";
import Error from "./ErrorMessage";
import Router from "next/router";

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

function CreateItem() {
  const [item, setItem] = useState({});

  const handleChange = (e) => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    setItem({ ...item, [name]: val });
  };

  const uploadFile = async (e) => {
    console.log("uploading file...");
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "sickfits");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dagomgh3i/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const file = await res.json();
    //esto no funcionó
    setItem({
      ...item,
      image: file.secure_url,
      largeImage: file.eager[0].secure_url,
    });
  };

  return (
    <Mutation mutation={CREATE_ITEM_MUTATION} variables={item}>
      {(createItem, { loading, error }) => (
        <Form
          onSubmit={async (e) => {
            e.preventDefault();
            const res = await createItem();
            Router.push({
              pathname: "/item",
              query: { id: res.data.createItem.id },
            });
          }}
        >
          <Error error={error}></Error>
          <fieldset disabled={loading} aria-busy={loading}>
            <label htmlFor="file">
              Image
              <input
                type="file"
                id="file"
                name="file"
                placeholder="Upload and image"
                required
                onChange={uploadFile}
              ></input>
              {item.image && <img src={item.image} alt="Preview"></img>}
            </label>

            <label htmlFor="title">
              Title
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Title"
                required
                value={item.title || ""}
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
                value={item.price || ""}
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
                value={item.description || ""}
                onChange={handleChange}
              ></textarea>
            </label>
            <button type="submit">Submit</button>
          </fieldset>
        </Form>
      )}
    </Mutation>
  );
}

export default memo(CreateItem);
export { CREATE_ITEM_MUTATION };
