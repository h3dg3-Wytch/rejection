import {
  createQuestion,
  addAskee,
  addQuestion,
  checkRejected
} from '../actions';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/sagas';

const composeEnhancers =
  (process.browser && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const sagaMiddleware = createSagaMiddleware();

const initialState = { questions: [] };
const reducer = (state = initialState, { payload, type } = {}) => {
  switch (type) {
    case createQuestion.type:
      return { ...state, questions: state.questions.concat([payload]) };
    case addAskee.type:
      return { ...state, currentAskee: payload.askee };
    case addQuestion.type:
      return { ...state, currentQuestion: payload.question };
    case checkRejected.type:
      return { ...state, currentlyRejected: payload.rejected };
    case 'INIT_LOAD':
      return payload;
    default:
      return state;
  }
};

const getScore = state =>
  state.questions.reduce(
    (acc, question) =>
      question.status === 'rejected'
        ? acc + 10
        : question.status === 'accepted'
        ? acc + 1
        : acc,
    0
  );

const getCurrentQuestion = state => ({
  question: state.currentQuestion,
  askee: state.currentAskee,
  status: state.currentlyRejected ? 'rejected' : 'accepted'
});

const initStore = (preloadedState = initialState) => {
  const store = createStore(
    reducer,
    preloadedState,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );

  sagaMiddleware.run(rootSaga);
  store.dispatch({ type: 'LOAD_INTIAL_STORE' });
  return store;
};

export default initStore;
export { initialState, reducer, getScore, getCurrentQuestion, initStore };
