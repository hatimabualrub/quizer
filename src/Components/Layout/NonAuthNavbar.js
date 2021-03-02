import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="nav row">
      <Link to="/" className="logo-link">
        <h1 className="logo">Quizer </h1>
      </Link>
      <ul className="auth-links row">
        <li>
          <Link to="/signin">Log in</Link>
        </li>
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>
      </ul>
    </div>
  );
}
