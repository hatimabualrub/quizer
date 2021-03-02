import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { requestCreateQuiz } from "../actions/quizActions";
import Toolbar from "../Components/Layout/Toolbar";

export default function CreateQuizScreen() {
  const [id, setid] = useState("");
  const [title, settitle] = useState("");
  const [password, setpassword] = useState("");
  const [duration, setduration] = useState(0);

  const createQuiz = useSelector((state) => state.createQuiz);
  const { createdQuiz } = createQuiz;

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (createdQuiz) {
      history.push(`add-question/${createdQuiz}`);
    }
  }, [createdQuiz]);

  const createQuizHandler = (e) => {
    if (id && title && password && duration) {
      if (duration <= 0) {
        return alert("Duration must be greater than zero");
      }
      e.preventDefault();
      dispatch(requestCreateQuiz({ id, title, password, duration }));
    }
  };

  return (
    <div className="main row">
      <div className="card center form-center">
        <form>
          <div className="form">
            <h2>Create Quiz</h2>
            <div className="row">
              <div className="col-2 col-form">
                <label htmlFor="title">Title</label>
                <input
                  id="title"
                  type="text"
                  placeholder="Enter Quiz Title"
                  required
                  value={title}
                  onChange={(e) => settitle(e.target.value)}
                />
              </div>
              <div className="col-1 col-form">
                <label htmlFor="min">Duration (in minutes)</label>
                <input
                  id="min"
                  type="Number"
                  placeholder="In Minutes"
                  required
                  value={duration}
                  onChange={(e) => setduration(e.target.value)}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-1 col-form">
                <label htmlFor="id">Quiz ID</label>
                <input
                  id="id"
                  type="text"
                  placeholder="Enter Quiz ID"
                  required
                  value={id}
                  onChange={(e) => setid(e.target.value)}
                />
              </div>
              <div className="col-1 col-form">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter Quiz password"
                  required
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                />
              </div>
            </div>

            <button onClick={createQuizHandler}>Create Quiz</button>
            <h1></h1>
          </div>
        </form>
      </div>

      <Toolbar />
    </div>
  );
}
