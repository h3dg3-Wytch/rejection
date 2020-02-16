import React, { Fragment } from 'react';

import App from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import initStore from '../src/reducer/RejectionReducer';
import { ReactReduxFirebaseProvider, firebaseReducer } from 'react-redux-firebase'
import firebase from 'firebase/app';



class MyApp extends App {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/serviceWorker.js");
    } else {
        console.log("Service worker not supported");
    }
  }

  render() {
    const { Component, pageProps, store } = this.props;

    const rrfConfig = {
      userProfile: 'users',
      // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
      // enableClaims: true // Get custom claims along with the profile
    };

    const rrfProps = {
      firebase,
      config: rrfConfig,
      dispatch: store.dispatch,
      // createFirestoreInstance // <- needed if using firestore
    }

    return (
      <Fragment>
        <Head>
          <title>Rejection App By H3dg3Wytch</title>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000" />
          <link href="/manifest.json" rel="manifest" />
          <meta name="theme-color" content="#72B340" />
          <meta
            name="description"
            content="Rejection app fork by Eric Elliot"
          />
        </Head>
        <Provider store={store}>
          <ReactReduxFirebaseProvider {...rrfProps}>
            <Component {...pageProps} />
          </ ReactReduxFirebaseProvider>
        </Provider>
      </Fragment>
    );
  }
}

export default withRedux(initStore)(MyApp);
