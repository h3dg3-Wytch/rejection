import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { firebaseConnect, useFirebase } from 'react-redux-firebase';

import setter, { checkBoxSetter } from '../util/eventSetter';

import { compose } from 'redux'

import { connect } from 'react-redux';

import Link from 'next/link';
import RejectionHistoryList from './RejectionHistoryList';

const RejectionForm = ({ score, createQuestion, auth, profile, questions, exampleScore, exampleQuestions }) => {

  const [currentAskee, setCurrentAskee] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [currentlyRejected, setCurrentRejected] = useState('accepted');

  const ownerId = auth.uid;

  if(ownerId) {
    return (
      <div>
        <h1 className="score">Score: {score}</h1>
        <form
          id="rejectionForm"
          onSubmit={() =>
            createQuestion({
              askee: currentAskee,
              question: currentQuestion,
              status: currentlyRejected,
              owner: ownerId
            })
          }
        >
          <div>
            <label>
              Askee:
              <input
                type="text"
                id="rejectionAskeeTextInput"
                onChange={setter(setCurrentAskee)}
              />
            </label>
          </div>
          <div>
            <label>
              Question:
              <input
                type="text"
                id="rejectionQuestionTextInput"
                onChange={setter(setCurrentQuestion)}
              />
            </label>
            <label>
              Rejected:
              <input
                type="checkbox"
                id="rejectionCheckboxInput"
                onChange={checkBoxSetter(setCurrentRejected)(checkStatus)}
              />
            </label>
          </div>
          <div>
            <button>Submit</button>
          </div>
        </form>
        <RejectionHistoryList questions={questions} />
        <Link href="/sign-in">
          <button>Sign in</button>
        </Link>
        <Link href="/sign-up">
          <button>Sign up</button>
        </Link>
      </div>
    );
  } else {   return (
    <div>
      <h1 className="score">Score: {exampleScore}</h1>
      <form
        id="rejectionForm"
        onSubmit={() =>
          createQuestion({
            askee: currentAskee,
            question: currentQuestion,
            status: currentlyRejected,
            owner: ownerId
          })
        }
      >
        <div>
          <label>
            Askee:
            <input
              type="text"
              id="rejectionAskeeTextInput"
              onChange={setter(setCurrentAskee)}
            />
          </label>
        </div>
        <div>
          <label>
            Question:
            <input
              type="text"
              id="rejectionQuestionTextInput"
              onChange={setter(setCurrentQuestion)}
            />
          </label>
          <label>
            Rejected:
            <input
              type="checkbox"
              id="rejectionCheckboxInput"
              onChange={checkBoxSetter(setCurrentRejected)(checkStatus)}
            />
          </label>
        </div>
        <div>
          <button>Submit</button>
        </div>
      </form>
      <RejectionHistoryList questions={exampleQuestions} />
      <Link href="/sign-in">
        <button>Sign in</button>
      </Link>
      <Link href="/sign-up">
        <button>Sign up</button>
      </Link>
    </div>
  ); 
  }
};

const checkStatus = checked => (checked ? 'rejected' : 'accepted');

RejectionForm.propTypes = {
  score: PropTypes.number,
  createQuestion: PropTypes.func
};

const enhance = compose(
  firebaseConnect((props) => [
    { path: 'questions' }
  ]),
  connect((state => ({
    questions: state.firebase.data.questions,
  })),
  )
)

export { RejectionForm };
export default enhance(RejectionForm);
