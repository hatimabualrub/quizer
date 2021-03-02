import {
  ANSWER_QUESTION,
  FINISH_QUIZ_FAIL,
  FINISH_QUIZ_REQUEST,
  FINISH_QUIZ_SUCCESS,
  JOIN_QUIZ_FAIL,
  JOIN_QUIZ_REMOVE,
  JOIN_QUIZ_REQUEST,
  JOIN_QUIZ_SUCCESS,
  ANSWER_QUESTION_REMOVE,
  CREATE_QUIZ_REQUEST,
  CREATE_QUIZ_SUCCESS,
  CREATE_QUIZ_FAIL,
  ADD_QUESTION,
  SUBMIT_QUIZ_REQUEST,
  SUBMIT_QUIZ_SUCCESS,
  SUBMIT_QUIZ_FAIL,
  CLEAR_QUESTIONS,
  GET_COMPLETED_REQUEST,
  GET_COMPLETED_SUCCESS,
  GET_COMPLETED_FAIL,
  GET_CREATED_REQUEST,
  GET_CREATED_SUCCESS,
  GET_CREATED_FAIL,
  GET_ATTEMPTS_REQUEST,
  GET_ATTEMPTS_SUCCESS,
} from "../constants/quizConstants";

export const quizJoinReducer = (state = {}, action) => {
  switch (action.type) {
    case JOIN_QUIZ_REQUEST:
      return { loading: true, removed: false };
    case JOIN_QUIZ_SUCCESS:
      return { loading: false, quiz: action.payload };
    case JOIN_QUIZ_FAIL:
      return { loading: false, error: action.payload };
    case JOIN_QUIZ_REMOVE:
      return {};
    default:
      return state;
  }
};

export const answerQuestionReducer = (state = [], action) => {
  switch (action.type) {
    case ANSWER_QUESTION:
      return action.payload;
    case ANSWER_QUESTION_REMOVE:
      return [];
    default:
      return state;
  }
};

export const quizFinishReducer = (state = { result: {} }, action) => {
  switch (action.type) {
    case FINISH_QUIZ_REQUEST:
      return { loading: true };
    case FINISH_QUIZ_SUCCESS:
      return { loading: false, result: action.payload };
    case FINISH_QUIZ_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createQuizReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_QUIZ_REQUEST:
      return { loading: true };
    case CREATE_QUIZ_SUCCESS:
      return { loading: false, createdQuiz: action.payload };
    case CREATE_QUIZ_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const addQuestionReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_QUESTION:
      return state.concat(action.payload);
    case CLEAR_QUESTIONS:
      return [];
    default:
      return state;
  }
};

export const quizSubmitReducer = (state = {}, action) => {
  switch (action.type) {
    case SUBMIT_QUIZ_REQUEST:
      return { loading: true };
    case SUBMIT_QUIZ_SUCCESS:
      return { loading: false, quizInfo: action.payload };
    case SUBMIT_QUIZ_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const completedQuizzesReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_COMPLETED_REQUEST:
      return { loading: true };
    case GET_COMPLETED_SUCCESS:
      return { loading: false, quizList: action.payload };
    case GET_COMPLETED_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createdQuizzesReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CREATED_REQUEST:
      return { loading: true };
    case GET_CREATED_SUCCESS:
      return { loading: false, quizList: action.payload };
    case GET_CREATED_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const attemptsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ATTEMPTS_REQUEST:
      return { loading: true };
    case GET_ATTEMPTS_SUCCESS:
      return { loading: false, attemptsList: action.payload };
    case GET_COMPLETED_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
