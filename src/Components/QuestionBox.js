import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { answerQuestion, requestFinishQuiz } from "../actions/quizActions";

export default function QuestionBox({ question, index, isLast }) {
  const { questionBody, answers } = question;
  const [currentAnswer, setcurrentAnswer] = useState(null);

  const dispatch = useDispatch();

  const history = useHistory();

  const nextButtonHandler = (e) => {
    if (currentAnswer !== null) {
      dispatch(answerQuestion(currentAnswer));
      setcurrentAnswer(null);
      if (isLast) {
        dispatch(requestFinishQuiz());
        localStorage.removeItem("minutes");
        localStorage.removeItem("seconds");
        history.push("/result");
      }
    } else {
      alert("No Answer Has Been Added!");
    }
  };

  return (
    <div className="card question-box">
      <div className="row row-start no-wrap question-row">
        <h3 className="question-num">{index + 1})</h3>
        <h3>{questionBody}</h3>
      </div>
      <div className="column">
        {answers.map((answer, index) => {
          return (
            <label key={index} className="answer-box row row-start">
              {answer.answerBody}
              <input
                type="radio"
                name="radio"
                onChange={() => setcurrentAnswer(index)}
                checked={currentAnswer === null ? false : null}
              />
              <span className="checkmark"></span>
            </label>
          );
        })}

        <div className="row row-end">
          <button className="small" onClick={nextButtonHandler}>
            {isLast ? (
              "Finish"
            ) : (
              <>
                Next <i className="fa fa-chevron-circle-right"></i>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
