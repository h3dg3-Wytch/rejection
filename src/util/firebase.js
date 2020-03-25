import * as firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';

import { initStore } from '../reducer/RejectionReducer';

import { loadUser } from '../actions';

// TODO make a user be able to sign in just by passing this around
// TODO line it it up to only the first store by using mapDispatchToProps
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


firebase.auth().onAuthStateChanged(user => {
  console.log('VVVVVVVVVVVV', initStore);
  if (user) {
    initStore().dispatch(loadUser(user));
  } else {
  }
});

export default firebase;
