import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import { requestSignup } from "../actions/userActions";
import Spinner from "../Components/Spinner/Spinner";

export default function SignupScreen() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [passwordConfirm, setpasswordConfirm] = useState("");
  const [confirmError, setconfirmError] = useState(false);

  const history = useHistory();
  const signupInfo = useSelector((state) => state.userSignup);
  const { loading, error } = signupInfo;
  const signinInfo = useSelector((state) => state.userSignin);
  const { token } = signinInfo;

  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      history.push("/home");
    }
  }, [token]);

  const signupHandler = (e) => {
    setconfirmError(false);
    if (passwordConfirm !== password) {
      e.preventDefault();
      setconfirmError(true);
    } else if (username.trim() !== "" || password.trim() !== "") {
      e.preventDefault();
      dispatch(requestSignup(username, password));
    }
  };

  return (
    <div className="main row">
      {loading && <Spinner />}
      <div className="card center">
        <form>
          <div className="form">
            <h2>Sign up</h2>
            <p>
              Already have an account?{" "}
              <Link to="/signin" className="prime-color">
                Log in
              </Link>
            </p>
            {error && <p className="error">{error}</p>}
            {confirmError && (
              <p className="error">Password and Confirm are not match</p>
            )}
            <label htmlFor="username">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              id="username"
              value={username}
              onChange={(e) => setusername(e.target.value)}
              required
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              id="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              required
            />

            <label htmlFor="passwordconfirm">Password Confirm</label>
            <input
              type="password"
              placeholder="Repeat your password"
              id="passwordconfirm"
              value={passwordConfirm}
              onChange={(e) => setpasswordConfirm(e.target.value)}
            />
            <p className="terms">
              By signing up you agree to our{" "}
              <a className="prime-color" href="#">
                Terms
              </a>{" "}
              and{" "}
              <a className="prime-color" href="#">
                Privacy policy
              </a>
            </p>
            <button type="submit" onClick={signupHandler}>
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
