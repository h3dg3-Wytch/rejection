import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import { loadState, saveState } from './util/localStorage';

import { reducer } from './reducer/RejectionReducer';

import rootSaga from './sagas/sagas';

import createSagaMiddleware from 'redux-saga';

const persistedState = loadState();

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  persistedState,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

store.subscribe(() => {
  saveState({ questions: store.getState().questions });
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
