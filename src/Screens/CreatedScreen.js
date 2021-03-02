import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCreatedQuizzes } from "../actions/quizActions";

import CreatedQuizCard from "../Components/CreatedQuizCard";
import ActivityBar from "../Components/Layout/SubNavbar/ActivityBar";
import Toolbar from "../Components/Layout/Toolbar";
import Spinner from "../Components/Spinner/Spinner";

export default function CreatedScreen() {
  const createdQuizzes = useSelector((state) => state.createdQuizzes);
  const { loading, error, quizList } = createdQuizzes;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCreatedQuizzes());
  }, []);

  return (
    <div className="main row row-center row-top padding-top">
      <ActivityBar />
      {loading && <Spinner />}
      {error && <p className="completedError">{error}</p>}
      {quizList &&
        quizList.map((quiz) => (
          <CreatedQuizCard
            title={quiz.title}
            id={quiz.id}
            _id={quiz._id}
            attempts={quiz.attempts}
            key={quiz.id}
            password={quiz.password}
          />
        ))}
      <Toolbar />
    </div>
  );
}
