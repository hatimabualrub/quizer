import React from "react";

import "./modal.css";

export default function modal(props) {
  return (
    <div id="myModal" className="modal">
      <div className="card modal-content">
        <span className="close">&times;</span>
        <div className="row row-center">
          <h3>{props.title}</h3>
        </div>
        {/* <div className="row">
          <p className="description">
            Quizer is an online application that helps you to create and attempt
            online quizzes in easy modern way.
          </p>
        </div> */}
        <div>{props.children}</div>
      </div>
    </div>
  );
}
