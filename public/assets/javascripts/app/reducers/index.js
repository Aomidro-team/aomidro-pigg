import session from './session';

export default { session };

// const users = createReducer({
//   [addUser]: (state, payload) => {
//     return { ...state, [payload.username]: true };
//   },
//   [removeUser]: (state, payload) => {
//     const newState = { ...state };
//     delete newState[payload.username];
//     return newState;
//   }
// }, initial.users);

// const messages = createReducer({
//   [newMessage]: (state, payload) => {
//     const { message } = payload;
//     return {
//       ...state,
//       list: [ ...state.list, message.id ],
//       entities: { ...state.entities, [message.id]: message }
//     };
//   }
// }, initial.messages);
