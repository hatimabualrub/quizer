import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { requestFinishQuiz } from "../actions/quizActions";

export default function Timer() {
  const joinedQuiz = useSelector((state) => state.joinQuiz);
  const { quiz, loading, error } = joinedQuiz;
  const { duration } = quiz;

  const dispatch = useDispatch();
  const history = useHistory();

  //   const [timeLeft, settimeLeft] = useState(duration);
  const [minutes, setminutes] = useState(duration);
  const [seconds, setseconds] = useState(0);

  useEffect(() => {
    let minute = localStorage.getItem("minutes")
      ? JSON.parse(localStorage.getItem("minutes"))
      : minutes;
    let second = localStorage.getItem("seconds")
      ? JSON.parse(localStorage.getItem("seconds"))
      : seconds;
    const timer = window.setInterval(() => {
      if (second === 0) {
        if (minute === 0) {
          dispatch(requestFinishQuiz());
          localStorage.removeItem("minutes");
          localStorage.removeItem("seconds");
          return history.push("/result");
        }
        second = 59;
        minute = minute - 1;
      } else {
        second = second - 1;
      }
      setseconds(second);
      setminutes(minute);
      localStorage.setItem("minutes", minute);
      localStorage.setItem("seconds", second);
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [duration]);

  return (
    <div className="row">
      <h3 className="time-title">Time left:</h3>
      <h3 className="time">
        {String(minutes).padStart(2, " ") +
          " : " +
          String(seconds).padStart(2, "0")}
      </h3>
    </div>
  );
}
