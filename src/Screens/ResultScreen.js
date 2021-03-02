import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Toolbar from "../Components/Layout/Toolbar";
import Spinner from "../Components/Spinner/Spinner";

export default function ResultScreen() {
  const finishQuiz = useSelector((state) => state.finishQuiz);
  const { loading, result } = finishQuiz;

  const history = useHistory();

  const onFinishHandler = () => {
    localStorage.removeItem("joinedQuiz");
    localStorage.removeItem("answers");
    localStorage.removeItem("result");
    history.push("home");
  };
  return (
    <div className="main row">
      {loading && <Spinner />}

      {result && (
        <div className="card center finish-center">
          <div className="row row-center">
            <h2>Quiz Finished !</h2>
          </div>
          <hr />
          <hr />
          <div className="row no-wrap row-center">
            <h3>Your Total Score is :</h3>
            <h3 className="red">
              {result?.score || 0} / {result?.limit || null}
            </h3>
          </div>
          <button onClick={onFinishHandler}>OK</button>
        </div>
      )}
      <Toolbar />
    </div>
  );
}
