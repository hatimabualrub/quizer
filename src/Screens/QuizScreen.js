import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import QuestionBox from "../Components/QuestionBox";
import Spinner from "../Components/Spinner/Spinner";
import Timer from "../Components/Timer";
import "../quiz.css";

export default function QuizScreen() {
  const joinedQuiz = useSelector((state) => state.joinQuiz);
  const { quiz, loading, error } = joinedQuiz;
  const { title, questions } = quiz;

  const answers = useSelector((state) => state.answers);
  const answersLength = answers.length;

  const isLast = answersLength + 1 === questions?.length;

  return (
    <div className="main row">
      <div className="sub-nav row">
        <h3 className="quiz-title">{title}</h3>
        <div className="questions">
          {questions &&
            questions.map((question, index) => (
              <a
                key={index}
                href="#"
                className={
                  index < answers.length
                    ? "passed"
                    : index === answers.length
                    ? "active-question"
                    : ""
                }
              >
                {index + 1}
              </a>
            ))}
        </div>
        <Timer />
      </div>
      {questions && (
        <QuestionBox
          question={questions[answersLength]}
          index={answersLength}
          isLast={isLast}
        />
      )}
      {loading && <Spinner />}
    </div>
  );
}
