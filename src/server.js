const express = require('express');
const next = require('next');
// const firebase = require("firebase/app");

// require("firebase/auth");
// require("firebase/firestore");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

var firebaseConfig = {
  apiKey: 'AIzaSyDJ-VJv3AW1wvFk6CeM5p-Oelh5HO0m0lg',
  authDomain: 'rejection-be1c8.firebaseapp.com',
  databaseURL: 'https://rejection-be1c8.firebaseio.com',
  projectId: 'rejection-be1c8',
  storageBucket: 'rejection-be1c8.appspot.com',
  messagingSenderId: '860477993669',
  appId: '1:860477993669:web:6db9fd57332ed683a736ac',
  measurementId: 'G-17C4QT7PPF'
};

// firebase.initializeApp(firebaseConfig);

app.prepare().then(() => {
  const server = express();
  server.use(express.json());
  server.use((req, res, next) => {
    // req.firebase = firebase;
    // res.firebase = firebase;
    next();
  });

  server.get('/a', (req, res) => {
    return app.render(req, res, '/a', req.query);
  });

  server.get('/b', (req, res) => {
    return app.render(req, res, '/b', req.query);
  });

  server.get('/posts/:id', (req, res) => {
    return app.render(req, res, '/posts', { id: req.params.id });
  });

  // server.post('/sign-up', (req, res) => {
  //   const email = req.param('email');
  //   const password = req.param('password');
  //   firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {});
  // });
  // server.post('/sign-in', (req, res) => {
  //   const email = req.param('email');
  //   const password = req.param('password');
  //   return firebase.auth().signInWithEmailAndPassword(email, password).then(res => {
  //     console.log('signed in');
  //     res.authenticated = true;
  //     return res;
  //   }).catch(function(error) {
  //     console.log('something went wrong');
  //   });
  // });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
