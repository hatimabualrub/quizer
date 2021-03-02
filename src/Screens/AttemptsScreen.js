import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router";

import { getAttempts } from "../actions/quizActions";
import ActivityBar from "../Components/Layout/SubNavbar/ActivityBar";
import Spinner from "../Components/Spinner/Spinner";

export default function AttemptsScreen() {
  const quizId = useParams().id;
  const attempts = useSelector((state) => state.attempts);
  const { attemptsList, loading, error } = attempts;

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAttempts(quizId));
  }, [dispatch]);
  return (
    <div className="main row row-center row-top padding-top">
      <ActivityBar />
      {loading && <Spinner />}
      {error && <p className="completedError">{error}</p>}
      {attemptsList && (
        <div className="card margin-top center finish-center">
          <div className="row row-center">
            <h2>{attemptsList?.title}</h2>
          </div>
          <div className="row">
            <div className="col-1 col-form">
              <hr />
            </div>
          </div>

          {attemptsList?.attemptsList.map((attempt) => (
            <>
              <div className="row no-wrap row-center">
                <h3>{attempt.user}</h3>
                <h3 className="red">{attempt.score}</h3>
              </div>
              <hr />
            </>
          ))}

          <button onClick={() => history.push("/created")} className="col-form">
            <i className="fa fa-arrow-circle-left"></i> Back
          </button>
        </div>
      )}
    </div>
  );
}
