import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";

import {
  addQuestionReducer,
  answerQuestionReducer,
  attemptsReducer,
  completedQuizzesReducer,
  createdQuizzesReducer,
  createQuizReducer,
  quizFinishReducer,
  quizJoinReducer,
  quizSubmitReducer,
} from "./reducers/quizReducer";
import { userSigninReducer, userSignupReducer } from "./reducers/userReducer";

const initialState = {
  userSignin: {
    token: localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token"))
      : null,
  },
  joinQuiz: {
    quiz: localStorage.getItem("joinedQuiz")
      ? JSON.parse(localStorage.getItem("joinedQuiz"))
      : {},
  },
  answers: localStorage.getItem("answers")
    ? JSON.parse(localStorage.getItem("answers"))
    : [],
  finishQuiz: {
    result: localStorage.getItem("result")
      ? JSON.parse(localStorage.getItem("result"))
      : {},
  },
  // createQuiz: {
  //   createdQuiz: localStorage.getItem("createdQuiz")
  //     ? JSON.parse(localStorage.getItem("createdQuiz"))
  //     : undefined,
  // },
};

const reducer = combineReducers({
  userSignin: userSigninReducer,
  userSignup: userSignupReducer,
  joinQuiz: quizJoinReducer,
  answers: answerQuestionReducer,
  finishQuiz: quizFinishReducer,
  createQuiz: createQuizReducer,
  addQuestion: addQuestionReducer,
  quizSubmit: quizSubmitReducer,
  completedQuizzes: completedQuizzesReducer,
  createdQuizzes: createdQuizzesReducer,
  attempts: attemptsReducer,
});

const store = createStore(reducer, initialState, applyMiddleware(thunk));

export default store;
