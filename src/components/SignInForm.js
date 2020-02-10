import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import setter from '../util/eventSetter';
import firestore from '../util/firebase';

const SignInForm = ({ user }) => {
  const [currentEmail, setCurrentEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  return (
    <div>
      <h1>Sign up</h1>
      <form onSubmit={() => {
          fetch('/sign-up', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ email: currentEmail, password: currentPassword})
          }).then(res => res);
      }}>
        <label>
            E-mail: 
        <input
                type="email"
                onChange={setter(setCurrentEmail)}
                />
        </label>
        <label>
            Password: 
        <input
                type="password"
                onChange={setter(setCurrentPassword)}
                />
        </label>
        <div>
          <input type="submit" value="Submit" />
        </div>
      </form>
      <h1>Sign in</h1>
      <form onSubmit={() => {
        firestore.auth().signInWithEmailAndPassword(currentEmail, currentPassword).then(res => {
          console.log('signed on succesfully');
          debugger;
          return res;
        }).catch( err => {
          console.log('blood of old valyria', err);
          return err;
        })
      }}>
        <label>
            E-mail: 
        <input
                type="email"
                onChange={setter(setCurrentEmail)}
                />
        </label>
        <label>
            Password: 
        <input
                type="password"
                onChange={setter(setCurrentPassword)}
                />
        </label>
        <div>
          <input type="submit" value="Submit" />
        </div>
      </form>
      { user && <h1>Logged on</h1>}
    </div>
  );
};

export default SignInForm;
