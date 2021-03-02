import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { requestLogout } from "../../actions/userActions";

export default function AuthNavbar() {
  const dispatch = useDispatch();
  const location = useLocation();

  const [isHome, setisHome] = useState(true);
  const [isActivity, setisActivity] = useState(false);

  useEffect(() => {
    if (location.pathname === "/home") {
      setisHome(true);
      setisActivity(false);
    } else {
      setisHome(false);
      if (
        location.pathname === "/activity" ||
        location.pathname === "/created"
      ) {
        setisActivity(true);
      }
    }
  }, [location]);

  const signoutHandler = () => {
    dispatch(requestLogout());
  };
  return (
    <div className="nav row">
      <div className="row">
        <Link className="logo-link" to="/home">
          <h1 className="logo">Quizer</h1>
        </Link>
        <ul className="nav-links row">
          <li>
            <Link
              to="/home"
              className={isHome ? "active nav-link-1" : "nav-link-1"}
            >
              <i className="fa fa-home"></i> Home
            </Link>
          </li>
          <li>
            <Link
              to="/activity"
              className={isActivity ? "active nav-link-1" : "nav-link-1"}
            >
              <i className="fa fa-history"></i> Activity
            </Link>
          </li>
        </ul>
      </div>

      <ul className="menu-links row">
        <li className="create">
          <Link to="/create-quiz">
            <i className="fa fa-plus-circle"></i> Create a quiz
          </Link>
        </li>
        <li className="icon">
          <div className="dropdown">
            <a href="#">
              <i className="white fa fa-bars"></i>
            </a>
            <ul className="dropdown-content">
              <li>
                <a href="/profile">Settings</a>
              </li>
              <li>
                <a href="#" onClick={signoutHandler}>
                  {" "}
                  Sign Out{" "}
                </a>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  );
}
