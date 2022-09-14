import { getAsksApi, getTokenApi } from '../../services/servicesApi';

export const USER = 'USER';
export const TOKEN = 'TOKEN';
export const SAVE_ASKS = 'SAVE_ASKS';
export const REQUEST_ADD_SCORE = 'REQUEST_ADD_SCORE';
export const REQUEST_SHOW_NEXT = 'REQUEST_SHOW_NEXT';
export const REQUEST_CORRECT_ANSWERS = 'REQUEST_CORRECT_ANSWERS';
export const REQUEST_TRUE_ANSWERS = 'REQUEST_TRUE_ANSWERS';
export const SAVE_PLAYERS = 'SAVE_PLAYERS';
export const RESET_GAME = 'RESET_GAME';

export const requestUser = (user) => ({
  type: USER,
  user,
});

export const tokenAction = (token) => ({
  type: TOKEN,
  token,
});

export const saveAsks = (asks) => ({
  type: SAVE_ASKS,
  asks,
});

export const fetchTokenAPI = () => (dispatch) => {
  getTokenApi().then((data) => {
    localStorage.setItem('token', data.token);
    dispatch(tokenAction(data.token));
    getAsksApi(data.token)
      .then((questions) => {
        dispatch(saveAsks(questions));
      });
  });
};

export const requestScore = (score) => ({
  type: REQUEST_ADD_SCORE,
  score,
});

export const requestShowBtnNext = (bool) => ({
  type: REQUEST_SHOW_NEXT,
  bool,
});

export const correctAnswers = (value) => ({
  type: REQUEST_CORRECT_ANSWERS,
  value,
});

export const trueAnswers = (value) => ({
  type: REQUEST_TRUE_ANSWERS,
  value,
});

export const savePlayers = (payload) => ({
  type: SAVE_PLAYERS,
  payload,
});

export const resetGame = () => ({
  type: RESET_GAME,
});
