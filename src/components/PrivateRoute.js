import React from "react";
import { Redirect, Route } from "react-router-dom";


function PrivateRoute({ component: Component, ...restOfProps }) {
  const user = localStorage.getItem("user");
  console.log("this", user);

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

export default PrivateRoute;
