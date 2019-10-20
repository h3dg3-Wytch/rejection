import { put, takeEvery, all, select, call } from 'redux-saga/effects';
import { createQuestion } from '../actions';

import { saveState, loadState } from '../util/localStorage';

const getQuestions = state => state.questions;

export function* createSagaQuestion(action) {
  yield put({ type: createQuestion.type, payload: action.payload });
}

export function* watchCreateQuestion() {
  yield takeEvery(createQuestion.sagaType, createSagaQuestion);
}

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
  const localStorageState = yield call(loadState);
  yield put({ type: 'INIT_LOAD', payload: localStorageState });
}

export function* watchLoadState() {
  yield takeEvery('LOAD_INTIAL_STORE', loadLocalState);
}

export default function* rootSaga() {
  yield all([watchEverything(), watchCreateQuestion(), watchLoadState()]);
}
