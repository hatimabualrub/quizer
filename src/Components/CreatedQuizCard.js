import React from "react";
import { useHistory } from "react-router-dom";

export default function CreatedQuizCard(props) {
  const history = useHistory();
  const showAttemptsHandler = () => {
    history.push(`/attempts/${props._id}`);
  };
  return (
    <div className="card margin-top card-non-centered fixed-card">
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
        <h3>Password:</h3>
        <h3 className="red">{props.password}</h3>
      </div>
      <div className="row no-wrap row-center">
        <h3>Attempts:</h3>
        <h3 className="red">{props.attempts.length}</h3>
      </div>
      <button onClick={showAttemptsHandler}>Show Attempts</button>
    </div>
  );
}
