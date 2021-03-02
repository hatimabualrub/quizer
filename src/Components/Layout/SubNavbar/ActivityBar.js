import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import "../../../quiz.css";

export default function ActivityBar() {
  const [isCreated, setisCreated] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/created") {
      setisCreated(true);
    } else {
      setisCreated(false);
    }
  }, [location]);
  return (
    <div className="sub-nav row">
      <div className="row sub-links">
        <Link
          className={!isCreated ? "none active-link" : "none no-border"}
          to="/activity"
        >
          Completed <i className="fa fa-check"></i>
        </Link>

        <Link
          className={isCreated ? "none active-link" : "none no-border"}
          to="/created"
        >
          Created <i className="fa fa-clipboard"></i>
        </Link>
      </div>
    </div>
  );
}
