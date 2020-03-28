import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { isLoaded } from 'react-redux-firebase';

import setter from '../util/eventSetter';

import { connect } from 'react-redux';
import { useFirebase } from 'react-redux-firebase';
import { useSelector } from 'react-redux'

import { firestore } from 'firebase';

import Router , {useRouter}  from 'next/router';

const SignInForm = ({ auth, profile }) => {
  const [currentEmail, setCurrentEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const firebase = useFirebase();
  const router = useRouter();

  const questions = useSelector(state => state.firebase.data['questions']);

  return (
    <div>
      <h1>Sign up</h1>
      <form
        onSubmit={() => {
          firebase.createUser({
            email: currentEmail,
            password: currentPassword
          });
          router.push('/index');
        }}
      >
        <label>
          E-mail:
          <input type="email" onChange={setter(setCurrentEmail)} />
        </label>
        <label>
          Password:
          <input type="password" onChange={setter(setCurrentPassword)} />
        </label>
        <div>
          <input type="submit" value="Submit" />
        </div>
      </form>
      <h1>Sign in</h1>
      <form onSubmit={() => {}}>
        <label>
          E-mail:
          <input type="email" onChange={setter(setCurrentEmail)} />
        </label>
        <label>
          Password:
          <input type="password" onChange={setter(setCurrentPassword)} />
        </label>
        <div></div>
      </form>
      <button
        onClick={() => {
            firebase.login({
              email: currentEmail,
              password: currentPassword
            })
            router.push('/index');
          }
        }
      >
        Login
      </button>
      <button onClick={() => firebase.logout()}>Logout</button>

      {authExists(auth) && <h1> You are logged in </h1>}

    </div>
  );
};

const authExists = auth => !!auth && !!auth.uid;


export default connect(state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile
}))(SignInForm);
