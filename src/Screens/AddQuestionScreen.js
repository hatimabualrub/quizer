import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import "../checkmark.css";
import { addQuestion, requestSubmitQuiz } from "../actions/quizActions";
import { CLEAR_QUESTIONS } from "../constants/quizConstants";
import Toolbar from "../Components/Layout/Toolbar";

export default function AddQuestionScreen() {
  const { id } = useParams();
  const [questionBody, setquestionBody] = useState("");
  const [firstAnswer, setfirstAnswer] = useState("");
  const [secondAnswer, setsecondAnswer] = useState("");
  const [thirdAnswer, setthirdAnswer] = useState("");
  const [correctAnswer, setcorrectAnswer] = useState(null);

  const dispatch = useDispatch();
  const history = useHistory();

  const addQuestionTest = useSelector((state) => state.addQuestion);

  useEffect(() => {}, [addQuestionTest]);

  const addQuestionHandler = (e) => {
    if (
      questionBody &&
      firstAnswer &&
      secondAnswer &&
      thirdAnswer &&
      correctAnswer !== null
    ) {
      e.preventDefault();
      const question = {
        questionBody,
        answers: [
          {
            answerBody: firstAnswer,
            isCorrect: correctAnswer === 1 ? true : false,
          },
          {
            answerBody: secondAnswer,
            isCorrect: correctAnswer === 2 ? true : false,
          },
          {
            answerBody: thirdAnswer,
            isCorrect: correctAnswer === 3 ? true : false,
          },
        ],
      };
      dispatch(addQuestion(question));
      clear();
    } else if (correctAnswer === null) {
      e.preventDefault();
      alert("Select A correct Answer!");
    }
  };

  const finishHandler = () => {
    dispatch(requestSubmitQuiz(id));
    dispatch({ type: CLEAR_QUESTIONS });
    history.push("/invite");
  };

  const clear = () => {
    document.getElementById("questionForm").reset();
    setquestionBody("");
    setfirstAnswer("");
    setsecondAnswer("");
    setthirdAnswer("");
  };

  return (
    <div className="main row">
      <div className="card center form-center">
        <form id="questionForm">
          <div className="form">
            <h2>Add Questions</h2>
            <div className="row">
              <h3>Question:</h3>
            </div>
            <div className="row">
              <div className="col-1 col-form">
                <div className="row no-wrap">
                  <h1 className="question-number">1)</h1>
                  <input
                    type="text"
                    placeholder="Enter Question Body"
                    value={questionBody}
                    onChange={(e) => setquestionBody(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-1 col-form">
                <hr />
              </div>
            </div>
            <div className="row">
              <h3>Answers:</h3>
            </div>
            <div className="row">
              <div className="col-1 col-form col-form-answer">
                <div className="row no-wrap">
                  <h1 className="question-number">A)</h1>
                  <input
                    type="text"
                    placeholder="Enter The First Answer"
                    value={firstAnswer}
                    onChange={(e) => setfirstAnswer(e.target.value)}
                    required
                  />
                  <label className="checkbox row row-start">
                    &#8203;
                    <input
                      type="radio"
                      name="radio"
                      onChange={() => setcorrectAnswer(1)}
                    />
                    <span className="checkmark add"></span>
                  </label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-1 col-form col-form-answer">
                <div className="row no-wrap">
                  <h1 className="question-number">B)</h1>
                  <input
                    type="text"
                    placeholder="Enter The Second Answer"
                    value={secondAnswer}
                    onChange={(e) => setsecondAnswer(e.target.value)}
                    required
                  />
                  <label className="checkbox row row-start">
                    &#8203;
                    <input
                      type="radio"
                      name="radio"
                      onChange={() => setcorrectAnswer(2)}
                    />
                    <span className="checkmark add"></span>
                  </label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-1 col-form col-form-answer">
                <div className="row no-wrap">
                  <h1 className="question-number">C)</h1>
                  <input
                    type="text"
                    placeholder="Enter The Third Answer"
                    value={thirdAnswer}
                    onChange={(e) => setthirdAnswer(e.target.value)}
                    required
                  />
                  <label className="checkbox row row-start">
                    &#8203;
                    <input
                      type="radio"
                      name="radio"
                      onChange={() => setcorrectAnswer(3)}
                    />
                    <span className="checkmark add"></span>
                  </label>
                </div>
              </div>
            </div>

            <div className="row col-form">
              <div className="col-2 col-form"></div>
              <div className="col-1">
                <div className="row no-wrap">
                  <button
                    type="submit"
                    className="small"
                    onClick={addQuestionHandler}
                  >
                    Add Question <i className="fa fa-plus-circle"></i>
                  </button>
                  <button
                    type="button"
                    onClick={finishHandler}
                    className="small"
                  >
                    Save & finish <i className="fa fa-save"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <Toolbar />
    </div>
  );
}
