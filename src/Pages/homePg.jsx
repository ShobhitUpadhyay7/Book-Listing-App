import React from "react";
import MyNavBar from "../Components/Navbar";
import Books from "./books";

const Home = () => {
  return (
    <>
      <MyNavBar />
      <h1 className="mt-3 mb-3 ms-2 text-muted"> Boooks</h1>
      <Books />
    </>
  );
};
export default Home;
