import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import image from "../images/innovation.png";

export default function MainScreen() {
  const userInfo = useSelector((state) => state.userSignin);
  const { token } = userInfo;
  const history = useHistory();
  useEffect(() => {
    if (token) {
      history.push("/home");
    }
  }, [token]);
  return (
    <div className="main row">
      <div className="col-1">
        <div className="card margin-bottom almost-full-width">
          <h3>What is Quizer ?</h3>
          <p className="description">
            Quizer is an online application that helps you to create and attempt
            online quizzes in easy modern way.
          </p>
        </div>
        <div className="card margin-bottom almost-full-width">
          <h3>How to start ?</h3>
          <p className="description">
            Just create an account and follow the steps to make your online quiz
            !{" "}
            <Link className="prime-color" to="/signup">
              Create Account
            </Link>
          </p>
        </div>
      </div>
      <div className="col-1">
        <img className="illustration" src={image} alt="" />
      </div>
    </div>
  );
}
