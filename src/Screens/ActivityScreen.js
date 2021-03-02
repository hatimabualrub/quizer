import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCompletedQuizzes } from "../actions/quizActions";
import CompletedQuizCard from "../Components/completedQuizCard";
import Spinner from "../Components/Spinner/Spinner";
import ActivityBar from "../Components/Layout/SubNavbar/ActivityBar";
import Toolbar from "../Components/Layout/Toolbar";

export default function ActivityScreen() {
  const completedQuizzes = useSelector((state) => state.completedQuizzes);
  const { loading, error, quizList } = completedQuizzes;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCompletedQuizzes());
  }, []);
  return (
    <div className="main row row-center row-top padding-top">
      <ActivityBar />

      {loading && <Spinner />}
      {error && <p className="completedError">{error}</p>}
      {quizList &&
        quizList.map((quiz) => (
          <CompletedQuizCard
            title={quiz.title}
            id={quiz.id}
            score={quiz.score}
            key={quiz.id}
          />
        ))}
      <Toolbar />
    </div>
  );
}
