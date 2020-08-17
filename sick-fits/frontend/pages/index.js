import React from "react";
import Items from "../components/Items";

function Home(props) {
  return <Items page={parseFloat(props.query.page) || 1}></Items>;
}

export default Home;
