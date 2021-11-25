export const initialState = {
  number: 0,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREASE':
      return {
        number: state.number + 1,
      };
    case 'DECREASE':
      return {
        number: state.number - 1,
      };
    case 'RESET':
      return {
        number: 0,
      };
    case 'RANDOM':
      return {
        number: state.number + action.payload,
      };
    default:
      return state;
  }
};
