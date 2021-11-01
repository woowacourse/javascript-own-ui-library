/** 
 * STEP2 STORE로 상태 관리하기
 * 
const createStore = (reducer, preloadedState = {}) => {
  let state = preloadedState;
  let subscribers = [];

  const getState = () => ({ ...state });

  const subscribe = (listener) => {
    subscribers.push(listener);

    return () => {
      // unsubscribe
      subscribers = subscribers.filter((l) => l !== listener);
    };
  };

  const dispatch = ({ type, payload = null }) => {
    state = reducer(state, { type, payload });

    notify();
  };

  const notify = () => {
    subscribers.forEach((l) => l());
  };

  return {
    getState,
    subscribe,
    dispatch,
  };
};

export default createStore;
*/
