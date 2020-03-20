import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { firebaseConnect, useFirebase } from 'react-redux-firebase';

import setter, { checkBoxSetter } from '../util/eventSetter';

import { compose } from 'redux'

import { connect } from 'react-redux';
import RejectionHistoryItem from './RejectionHistoryItem';

const RejectionForm = ({ score, createQuestion, auth, profile, questions }) => {


  const [currentAskee, setCurrentAskee] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [currentlyRejected, setCurrentRejected] = useState('accepted');

  const ownerId = auth.uid;
  // let rejectionItemListItems;
  // if(questions){
  //   rejectionItemListItems = questions.questions.map( question => <RejectionHistoryItem question={question}/>)
  // }

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
    </div>
  );
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
