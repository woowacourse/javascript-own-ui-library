const createStore = (reducer, preloadedState = {}, ...middlewares) => {
  let state = preloadedState;
  const subscribers = [];
  const middlewareList = middlewares ? middlewares.slice().reverse() : []; // 인자로 입력 받은 미들웨어의 실행 순서를 유지하기 위함

  const getState = () => ({ ...state });

  const subscribe = (listener) => {
    subscribers.push(listener);

    return () => {
      // unsubscribe
      subscribers = subscribers.filter((l) => l !== listener);
    };
  };

  const dispatch = (action) => {
    state = reducer(state, action);
    _notify();

    return action;
  };

  const _notify = () => {
    subscribers.forEach((l) => l());
  };

  let next = dispatch; // 미들웨어 각각의 두 번째 인자로 넘겨줄 dispatch 함수

  // 미들웨어 첫 번째 인자로 넘겨줄 스토어 객체
  const _store = {
    getState,
    dispatch,
  };

  // 미들웨어를 실행할 때 두 번째 인자로 받는 dispatch가
  // 다음 미들웨어를 실행시킬 수 있도록 dispatch 함수를 미들웨어 별로 갱신함
  middlewareList.forEach((m) => {
    next = m(_store)(next);
  });

  return {
    getState,
    subscribe,
    dispatch: next,
  };
};

export default createStore;
