import { SAVE_PLAYERS } from '../actions';

const INITIAL_STATE = {
  players: [],
};

export default function gameReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_PLAYERS:
    return {
      ...state,
      players: [
        ...state.players, {
          ...action.payload,
        },
      ],
    };
  default:
    return state;
  }
}
