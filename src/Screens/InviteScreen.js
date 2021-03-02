import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Toolbar from "../Components/Layout/Toolbar";
import Spinner from "../Components/Spinner/Spinner";

export default function InviteScreen() {
  const quizSubmit = useSelector((state) => state.quizSubmit);
  const { quizInfo, loading, error } = quizSubmit;

  const history = useHistory();

  useEffect(() => {
    if (loading === undefined && loading === undefined) {
      history.push("home");
    }
  }, [quizInfo, loading]);

  const copyToClipboard = () => {
    const el = document.createElement("textarea");
    el.value = `Quiz ID: ${quizInfo?.quizID}\nPassword: ${quizInfo?.password}`;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  };

  return (
    <div className="main row">
      {quizInfo ? (
        <div className="card center finish-center">
          <div className="row row-center">
            <h2>{quizInfo.title}</h2>
          </div>
          <hr />
          <hr />
          <div className="row no-wrap row-center">
            <h3>Quiz ID:</h3>
            <h3 className="red">{quizInfo.quizID}</h3>
          </div>
          <div className="row no-wrap row-center">
            <h3>Password:</h3>
            <h3 className="red">{quizInfo.password}</h3>
          </div>
          <button onClick={copyToClipboard}>Copy Invitation</button>
          <button onClick={() => history.push("/home")}>Finish</button>
        </div>
      ) : (
        loading && <Spinner />
      )}
      <Toolbar />
    </div>
  );
}
