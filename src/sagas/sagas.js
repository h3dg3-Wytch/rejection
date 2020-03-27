import { put, takeEvery, all, select, call } from 'redux-saga/effects';

import { saveState, loadState } from '../util/localStorage';

import { initialState } from '../reducer/RejectionReducer';

import firebase from 'firebase/app';
import 'firebase/database';

export const getQuestions = state => {
  console.log(state); 
  return state.questions;
};

export function* persistState({ type }) {
  if (!type.includes('LOAD') && !type.includes('INIT') && !type.includes('FIREBASE') && !type.includes('Firebase') ) {
    const questions = yield select(getQuestions);
    yield call(saveState,  questions );
  }
}

export function* saveToFirebase({ type }) {
  // const questions = yield select(getQuestions);
  // yield firebase.ref('questions').set({ questions });
} 

export function* watchEverything() {
  yield takeEvery('*', persistState);
}

export function* loadLocalState() {
  let localStorageState = yield call(loadState);
  if (localStorageState === undefined) {
    localStorageState = initialState;
  };
  yield put({ type: 'INIT_LOAD', payload: localStorageState});

};

export function* watchLoadState() {
  yield takeEvery('LOAD_INTIAL_STORE', loadLocalState);
}

export function* watchSaveToFirebase() {
  yield takeEvery('SAVE_TO_FIREBASE', saveToFirebase)
}

export default function* rootSaga() {
  yield all([watchEverything(), watchSaveToFirebase(), watchLoadState()]);
}
