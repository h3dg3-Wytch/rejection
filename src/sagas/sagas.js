import { put, takeEvery, all } from 'redux-saga/effects';
import { createQuestion } from '../actions';

export function* createSagaQuestion(action) {
  console.log('the fox and the lion');
  yield put({ type: createQuestion.type, payload: action.payload });
}

export function* watchCreateQuestion() {
  yield takeEvery(createQuestion.sagaType, createSagaQuestion);
}

export default function* rootSaga() {
  yield all([watchCreateQuestion()]);
}
