// import { REQUEST_SHOW_NEXT } from '../actions/game';
// import { SAVE_ASKS } from '../actions';
// // Esse reducer será responsável por tratar as informações do GAME
import { SAVE_PLAYERS } from '../actions';

const INITIAL_STATE = {
  players: [],
};
// const INITIAL_STATE = {
//   questions: [],
//   showNext: false,
// };

export default function gameReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_PLAYERS:
    return {
      ...state,
      players: [
        ...state.players,
        {
          ...action.payload,
        },
      ],
    };
  default:
    return state;
  }
}
// function gameReducer(state = INITIAL_STATE, action) {
//   switch (action.type) {
//   case SAVE_ASKS:
//     return {
//       ...state,
//       questions: action.asks,
//     };
//   case REQUEST_SHOW_NEXT:
//     return {
//       ...state,
//       showNext: action.bool,
//     };
//   default:
//     return state;
//   }
// }

// export default gameReducer;
