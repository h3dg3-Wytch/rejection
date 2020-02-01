import React, { useState } from 'react';
import PropTypes from 'prop-types';

import setter from '../util/eventSetter';

const SignInForm = () => {
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
          fetch('/sign-in', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ email: currentEmail, password: currentPassword})
          }).then(res => {
            console.log('Signed in? fire and blood');
            console.log(res.signedIn);
            return res;
          });
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
    </div>
  );
};

export default SignInForm;
