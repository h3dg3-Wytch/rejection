import {
  createQuestion,
  addAskee,
  addQuestion,
  checkRejected,
  loadUser
} from '../actions';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/sagas';
import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDJ-VJv3AW1wvFk6CeM5p-Oelh5HO0m0lg',
  authDomain: 'rejection-be1c8.firebaseapp.com',
  databaseURL: 'https://rejection-be1c8.firebaseio.com',
  projectId: 'rejection-be1c8',
  storageBucket: 'rejection-be1c8.appspot.com',
  messagingSenderId: '860477993669',
  appId: '1:860477993669:web:6db9fd57332ed683a736ac',
  measurementId: 'G-17C4QT7PPF'
};

console.log('fire and blood', firebase);
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
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
    case loadUser.type:
      return { ...state, user: payload.user };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  questions: reducer
});

const getScore = state =>
  state.questions
    .filter(question => state.auth.uid === question.owner)
    .reduce(
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
    rootReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );

  sagaMiddleware.run(rootSaga);
  store.dispatch({ type: 'LOAD_INTIAL_STORE' });
  return store;
};

export default initStore;
export { initialState, reducer, getScore, getCurrentQuestion, initStore };
