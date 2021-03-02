import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { requestJoinQuiz } from "../actions/quizActions";
import Toolbar from "../Components/Layout/Toolbar";
import Spinner from "../Components/Spinner/Spinner";

export default function HomeScreen() {
  const [quizId, setquizId] = useState("");
  const [password, setpassword] = useState("");

  const joinQuiz = useSelector((state) => state.joinQuiz);
  const { loading, error, quiz } = joinQuiz;

  const history = useHistory();

  const dispatch = useDispatch();

  useEffect(() => {
    if (quiz?.questions) {
      history.push("/quiz");
    }
  }, [quiz]);

  const joinQuizHandler = (e) => {
    if (quizId !== "" && password !== "") {
      e.preventDefault();
      dispatch(requestJoinQuiz(quizId, password));
    }
  };

  return (
    <div className="main row">
      <div className="col-1">
        <div className="card center sub-center">
          <form>
            <div className="form">
              <h2>Join Quiz</h2>
              {/* <p>Quiz ID and Password Should be provided by the Quiz creator</p> */}
              {error && <p className="error">{error}</p>}
              <label htmlFor="quizid">Quiz ID</label>
              <input
                type="text"
                placeholder="Enter Quiz ID"
                id="quizid"
                value={quizId}
                onChange={(e) => setquizId(e.target.value)}
                required
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Enter Quiz password"
                id="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                required
              />
              <button type="submit" onClick={joinQuizHandler}>
                Join Quiz
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="col-1">
        <div className="card center sub-center ">
          <h2>Basic Tips</h2>
          <h3>Manage your time</h3>
          <p className="description">
            Every quiz has a time limit that you cant exceed!
          </p>
          <h3>Don't rush</h3>
          <p className="description">
            Once you hit finish you cant reattempt Quiz!
          </p>
          <h3>Contact quiz creator</h3>
          <p className="description">
            Make sure to contact the Quiz creator for details!
          </p>
        </div>
      </div>

      {loading && <Spinner />}
      <Toolbar />
    </div>
  );
}
