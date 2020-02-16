import React from 'react';
import { useSelector } from 'react-redux';
import { isLoaded } from 'react-redux-firebase';


import RejectionForm from '../../components/RejectionForm';

import { getScore } from '../../reducer/RejectionReducer';
import { createQuestion } from '../../actions';

import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import SignInForm from '../../components/SignInForm';

function AuthIsLoaded({ children }) {
  const auth = useSelector(state => state.firebase.auth)
  if (!isLoaded(auth)) return <div>splash screen...</div>;
  return children
}

function App({ score, createQuestion, user }) {
  return (
    <div className="App">

      <AuthIsLoaded>
        <RejectionForm score={score} createQuestion={createQuestion} />
        <SignInForm user={user} />
      </AuthIsLoaded>
      
    </div>
  );
}

function mapStateToProps(state) {
  return {
    score: getScore(state.questions),
    user: state.user
  };
}

const mapDispatchToProps = {
  createQuestion
};

App.propTypes = {
  score: PropTypes.number,
  createQuestion: PropTypes.func
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
