import React from "react";
import { useSelector } from "react-redux";

import NonAuthNavbar from "./Components/Layout/NonAuthNavbar";
import MainScreen from "./Screens/MainScreen";
import SigninScreen from "./Screens/SigninScreen";
import SignupScreen from "./Screens/SignupScreen";
import { Route, Switch } from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen";
import AuthNavbar from "./Components/Layout/AuthNavbar";
import QuizScreen from "./Screens/QuizScreen";
import ResultScreen from "./Screens/ResultScreen";
import CreateQuizScreen from "./Screens/CreateQuizScreen";
import AddQuestionScreen from "./Screens/AddQuestionScreen";
import InviteScreen from "./Screens/InviteScreen";
import ActivityScreen from "./Screens/ActivityScreen";
import CreatedScreen from "./Screens/CreatedScreen";
import AttemptsScreen from "./Screens/AttemptsScreen";
import AuthRoute from "./Components/AuthRoute";

export default function App() {
  const signinInfo = useSelector((state) => state.userSignin);
  const { token } = signinInfo;

  return (
    <div className="grid-container">
      {token ? <AuthNavbar /> : <NonAuthNavbar />}
      <Switch>
        <Route path="/signup" component={SignupScreen} />
        <Route path="/signin" component={SigninScreen} />

        <AuthRoute path="/home" component={HomeScreen} />
        <AuthRoute path="/quiz" component={QuizScreen} />
        <AuthRoute path="/result" component={ResultScreen} />
        <AuthRoute path="/create-quiz" component={CreateQuizScreen} />
        <AuthRoute path="/add-question/:id" component={AddQuestionScreen} />
        <AuthRoute path="/invite" component={InviteScreen} />
        <AuthRoute path="/activity" component={ActivityScreen} />
        <AuthRoute path="/created" component={CreatedScreen} />
        <AuthRoute path="/attempts/:id" component={AttemptsScreen} />
        <Route path="/" component={MainScreen} />
      </Switch>
    </div>
  );
}
