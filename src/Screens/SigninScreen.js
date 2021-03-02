import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { requestSignin } from "../actions/userActions";
import Spinner from "../Components/Spinner/Spinner";

export default function SigninScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const signinInfo = useSelector((state) => state.userSignin);
  const { token, loading, error } = signinInfo;

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (token) {
      history.push("/home");
    }
  }, [token]);

  const signinHandler = async (e) => {
    if (username.trim() !== "" || password.trim() !== "") {
      e.preventDefault();
      dispatch(requestSignin(username, password));
    }
  };

  return (
    <div className="main row">
      {loading && <Spinner />}
      <div className="card center">
        <form>
          <div className="form">
            <h2>Log in</h2>
            <p>
              Don't have an account?{" "}
              <Link to="/signup" className="prime-color">
                Sign up
              </Link>
            </p>
            {error && <p className="error">{error}</p>}
            <label htmlFor="username">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" onClick={signinHandler}>
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
