import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

export default function AuthRoute({ component: Component, ...rest }) {
  const userSignin = useSelector((state) => state.userSignin);
  const { token } = userSignin;
  return (
    <Route
      {...rest}
      render={(props) =>
        token ? <Component {...props}></Component> : <Redirect to="/" />
      }
    ></Route>
  );
}
