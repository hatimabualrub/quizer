import Axios from "axios";

import { host } from "../globals";
import {
  ADD_QUESTION,
  ANSWER_QUESTION,
  ANSWER_QUESTION_REMOVE,
  CREATE_QUIZ_FAIL,
  CREATE_QUIZ_REQUEST,
  CREATE_QUIZ_SUCCESS,
  FINISH_QUIZ_FAIL,
  FINISH_QUIZ_REQUEST,
  FINISH_QUIZ_SUCCESS,
  GET_ATTEMPTS_FAIL,
  GET_ATTEMPTS_REQUEST,
  GET_ATTEMPTS_SUCCESS,
  GET_COMPLETED_FAIL,
  GET_COMPLETED_REQUEST,
  GET_COMPLETED_SUCCESS,
  GET_CREATED_FAIL,
  GET_CREATED_REQUEST,
  GET_CREATED_SUCCESS,
  JOIN_QUIZ_FAIL,
  JOIN_QUIZ_REMOVE,
  JOIN_QUIZ_REQUEST,
  JOIN_QUIZ_SUCCESS,
  SUBMIT_QUIZ_FAIL,
  SUBMIT_QUIZ_REQUEST,
  SUBMIT_QUIZ_SUCCESS,
} from "../constants/quizConstants";

export const requestJoinQuiz = (id, password) => async (dispatch, getState) => {
  dispatch({ type: JOIN_QUIZ_REQUEST });
  try {
    const {
      userSignin: { token },
    } = getState();
    const { data } = await Axios.post(
      `${host}quiz/attempt`,
      { id: id, password: password },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    localStorage.setItem("joinedQuiz", JSON.stringify(data));
    dispatch({ type: JOIN_QUIZ_SUCCESS, payload: data });
  } catch (e) {
    dispatch({
      type: JOIN_QUIZ_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};

export const answerQuestion = (answerIndex) => (dispatch, getState) => {
  const { answers } = getState();
  let answersNew = answers.concat(answerIndex);
  dispatch({
    type: ANSWER_QUESTION,
    payload: answersNew,
  });
  localStorage.setItem("answers", JSON.stringify(answersNew));
};

export const requestFinishQuiz = () => async (dispatch, getState) => {
  dispatch({
    type: FINISH_QUIZ_REQUEST,
  });
  const { answers, userSignin, joinQuiz } = getState();
  const { token } = userSignin;
  const { quiz } = joinQuiz;
  const { _id } = quiz;
  try {
    const { data } = await Axios.post(
      `${host}quiz/finishattempt`,
      {
        answers,
        quizId: _id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: FINISH_QUIZ_SUCCESS, payload: data });
    localStorage.removeItem("joinedQuiz");
    localStorage.removeItem("answers");
    localStorage.setItem("result", JSON.stringify(data));
    dispatch({ type: JOIN_QUIZ_REMOVE });
    dispatch({ type: ANSWER_QUESTION_REMOVE });
  } catch (e) {
    dispatch({
      type: FINISH_QUIZ_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};

export const requestCreateQuiz = (quiz) => async (dispatch, getState) => {
  dispatch({ type: CREATE_QUIZ_REQUEST });
  const {
    userSignin: { token },
  } = getState();
  try {
    const { data } = await Axios.post(`${host}quiz/create`, quiz, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // localStorage.setItem("createdQuiz", JSON.stringify(data));
    dispatch({ type: CREATE_QUIZ_SUCCESS, payload: data });
  } catch (e) {
    dispatch({
      type: CREATE_QUIZ_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};

export const addQuestion = (question) => {
  return {
    type: ADD_QUESTION,
    payload: { ...question },
  };
};

export const requestSubmitQuiz = (quizID) => async (dispatch, getState) => {
  dispatch({ type: SUBMIT_QUIZ_REQUEST });
  const {
    userSignin: { token },
    addQuestion,
  } = getState();
  try {
    const { data } = await Axios.post(
      `${host}quiz/add-questions`,
      {
        quiz_id: quizID,
        questions: addQuestion,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: SUBMIT_QUIZ_SUCCESS, payload: data });
  } catch (e) {
    dispatch({
      type: SUBMIT_QUIZ_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};

export const getCompletedQuizzes = () => async (dispatch, getState) => {
  dispatch({ type: GET_COMPLETED_REQUEST });
  const {
    userSignin: { token },
  } = getState();
  try {
    const { data } = await Axios.get(`${host}quiz/showcompleted`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: GET_COMPLETED_SUCCESS, payload: data });
  } catch (e) {
    dispatch({
      type: GET_COMPLETED_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};

export const getCreatedQuizzes = () => async (dispatch, getState) => {
  dispatch({ type: GET_CREATED_REQUEST });
  const {
    userSignin: { token },
  } = getState();
  try {
    const { data } = await Axios.get(`${host}quiz/showcreated`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: GET_CREATED_SUCCESS, payload: data });
  } catch (e) {
    dispatch({
      type: GET_CREATED_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};

export const getAttempts = (quizID) => async (dispatch, getState) => {
  dispatch({ type: GET_ATTEMPTS_REQUEST });
  const {
    userSignin: { token },
  } = getState();
  try {
    const { data } = await Axios.get(`${host}quiz/showattempts/${quizID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: GET_ATTEMPTS_SUCCESS, payload: data });
  } catch (e) {
    dispatch({
      type: GET_ATTEMPTS_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};
