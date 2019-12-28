import React, { useState } from 'react';
import PropTypes from 'prop-types';

import setter, { checkBoxSetter } from '../util/eventSetter';

const RejectionForm = ({ score, createQuestion }) => {
  const [currentAskee, setCurrentAskee] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [currentlyRejected, setCurrentRejected] = useState('accepted');

  return (
    <div>
      <h1 className="score">Score: {score}</h1>
      <form
        id="rejectionForm"
        onSubmit={() =>
          createQuestion({
            askee: currentAskee,
            question: currentQuestion,
            status: currentlyRejected
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

export default RejectionForm;
