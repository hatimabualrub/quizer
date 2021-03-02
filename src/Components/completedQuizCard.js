import React from "react";

export default function completedQuizCard(props) {
  return (
    <div className="card margin-top card-non-centered fixed-card ">
      <div className="row row-center">
        <h2>{props.title}</h2>
      </div>
      <hr />
      <hr />
      <div className="row no-wrap row-center">
        <h3>Quiz ID:</h3>
        <h3 className="red">{props.id}</h3>
      </div>
      <div className="row no-wrap row-center">
        <h3>Score</h3>
        <h3 className="red">{props.score}</h3>
      </div>
    </div>
  );
}
