// import { REQUEST_ADD_SCORE, REQUEST_SHOW_NEXT } from '../actions/game';
import { USER, SAVE_ASKS,
  REQUEST_ADD_SCORE,
  REQUEST_SHOW_NEXT,
  REQUEST_CORRECT_ANSWERS,
  REQUEST_TRUE_ANSWERS,
  RESET_GAME } from '../actions/index';
// Esse reducer será responsável por tratar as informações do GAME

const INITIAL_STATE = {
  score: 0,
  name: '',
  assertions: 0,
  gravatarEmail: '',
  questions: [],
  showNext: false,
  answers: 0,
  trueAnswers: 0,
};

function gameReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case USER:
    return {
      ...state,
      name: action.user.username,
      email: action.user.email,
    };
  case REQUEST_ADD_SCORE:
    return {
      ...state,
      score: Number(state.score) + Number(action.score),
    };
  case SAVE_ASKS:
    return {
      ...state,
      questions: action.asks,
    };
  case REQUEST_SHOW_NEXT:
    return {
      ...state,
      showNext: action.bool,
    };
  case REQUEST_CORRECT_ANSWERS:
    return {
      ...state,
      answers: Number(action.value),
      assertions: action.value + state.trueAnswers,
    };
  case REQUEST_TRUE_ANSWERS:
    return {
      ...state,
      trueAnswers: Number(action.value),
      assertions: action.value + state.answers,
    };
  case RESET_GAME:
    return {
      ...state,
      name: '',
      assertions: 0,
      score: 0,
      gravatarEmail: '',
    };
  default:
    return state;
  }
}

export default gameReducer;
