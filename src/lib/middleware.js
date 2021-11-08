export const logger = (store) => (next) => (action) => {
  console.log('-----LOGGER-----');

  const isThunkAction = typeof action === 'function';

  console.group(isThunkAction ? 'ThunkAction' : action.type);
  console.info('dispatching', isThunkAction ? 'func action' : action);

  const result = next(action);

  console.log('next state', store.getState());
  console.groupEnd();
  return result;
};

export const thunk = (store) => (next) => (action) => {
  console.log('-----THUNK-----');

  if (typeof action === 'function') {
    return action(store.dispatch, store.getState);
  }

  return next(action);
};
