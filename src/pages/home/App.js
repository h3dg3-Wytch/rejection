import React from 'react';
import { useSelector } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'

import RejectionForm from '../../components/RejectionForm';

import { getScore, getExampleScore } from '../../reducer/RejectionReducer';
import { createQuestion } from '../../actions';

import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import SignInForm from '../../components/SignInForm';

function AuthIsLoaded({ children }) {
  const auth = useSelector(state => state.firebase.auth);
  if (!isLoaded(auth)) return <div>splash screen...</div>;
  return children;
}

function App({ score, createQuestion, auth, profile, questions, exampleScore, exampleQuestions }) {
  return (
    <div className="App">
      <AuthIsLoaded>
        <RejectionForm
          score={score}
          createQuestion={createQuestion}
          auth={auth}
          profile={profile}
          exampleScore={exampleScore}
          exampleQuestions={exampleQuestions}
        />
      </AuthIsLoaded>
    </div>
  );
}

const authExists = auth => !!auth && !!auth.uid;

function mapStateToProps(state) {
  const auth = state.firebase.auth;
  const questions = state.questions.questions || [];
  const firebaseQuestions = state.firebase.data.questions || [];
  const userQueries = getUserQueries(firebaseQuestions) || [];
  const userQuestions = [].concat.apply([],userQueries);
  const score = getScore({userQuestions, auth});
  return {
    score,
    auth,
    profile: state.firebase.profile,
    questions: firebaseQuestions,
    exampleScore: getExampleScore({ questions }),
    exampleQuestions: questions
  };
}

const getUserQueries = questions => {
  if(questions) {
    return Object.keys(questions).map( key => questions[key] );
  } else {
    return [];
  }
}

const mapDispatchToProps = {
  createQuestion
};

App.propTypes = {
  score: PropTypes.number,
  createQuestion: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
