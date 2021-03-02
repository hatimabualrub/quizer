import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Toolbar() {
  const location = useLocation();
  return (
    <div className="tool-bar card">
      <ul className="row">
        <li>
          <Link
            className={location.pathname === "/home" ? "tool-bar-active" : ""}
            to="/home"
          >
            <i className="fa fa-home"></i>
          </Link>
          <p>Home</p>
        </li>
        <li>
          <Link
            className={
              location.pathname === "/activity" ||
              location.pathname === "/created" ||
              location.pathname === "/attempts"
                ? "tool-bar-active"
                : ""
            }
            to="/activity"
          >
            <i className="fa fa-history"></i>
          </Link>
          <p>Activity</p>
        </li>
        <li>
          <Link
            className={
              location.pathname === "/create-quiz" ||
              location.pathname === "/add-question"
                ? "tool-bar-active"
                : ""
            }
            to="/create-quiz"
          >
            <i className="fa fa-plus-circle"></i>
          </Link>
          <p>Add quiz</p>
        </li>
      </ul>
    </div>
  );
}
