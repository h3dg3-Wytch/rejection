import React from 'react';
import { useSelector } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'

import RejectionForm from '../../components/RejectionForm';

import { getScore } from '../../reducer/RejectionReducer';
import { createQuestion } from '../../actions';

import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import SignInForm from '../../components/SignInForm';

import { compose } from 'redux'

function AuthIsLoaded({ children }) {
  const auth = useSelector(state => state.firebase.auth);
  if (!isLoaded(auth)) return <div>splash screen...</div>;
  return children;
}

function App({ score, createQuestion, auth, profile }) {
  return (
    <div className="App">
      <AuthIsLoaded>
        <RejectionForm
          score={score}
          createQuestion={createQuestion}
          auth={auth}
          profile={profile}
        />
        <SignInForm />
      </AuthIsLoaded>
    </div>
  );
}

function mapStateToProps(state) {
  const auth = state.firebase.auth;
  return {
    score: getScore({ questions: state.questions.questions, auth }),
    auth,
    profile: state.firebase.profile
  };
}

const mapDispatchToProps = {
  createQuestion
};

App.propTypes = {
  score: PropTypes.number,
  createQuestion: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
