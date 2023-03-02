import React from "react";
import PrivateRoute from "../utils/PrivateRoute";

const Home = () => {
  return <h1>Home</h1>;
};

export default PrivateRoute(Home);
