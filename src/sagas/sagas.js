import { put, takeEvery, all, select, call } from 'redux-saga/effects';

import { saveState, loadState } from '../util/localStorage';

import { reducer, loadInitialStore } from '../reducer/RejectionReducer';

export const getQuestions = state => state.questions;

export function* persistState({ type }) {
  if (!type.includes('LOAD') && !type.includes('INIT')) {
    const questions = yield select(getQuestions);
    yield call(saveState, { questions });
  }
}

export function* watchEverything() {
  yield takeEvery('*', persistState);
}

export function* loadLocalState() {
  let localStorageState = yield call(loadState);
  if (localStorageState === undefined) {
    localStorageState = reducer(); // returns initial state
  }
  yield put({ type: 'INIT_LOAD', payload: localStorageState });
}

export function* watchLoadState() {
  yield takeEvery(loadInitialStore().type, loadLocalState);
}

export default function* rootSaga() {
  yield all([watchEverything(), watchLoadState()]);
}
