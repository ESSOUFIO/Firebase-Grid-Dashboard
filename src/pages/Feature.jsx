import React from "react";
import PrivateRoute from "../utils/PrivateRoute";

const Feature = () => {
  return <h2>Feature</h2>;
};

export default PrivateRoute(Feature);
