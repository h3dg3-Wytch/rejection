import React from 'react';
import PropTypes from 'prop-types';

const RejectionHistoryItem = ({ id, question, askee, status }) => (
  <div>
    <li key={id}>
      Question: {question} Askee: {askee} Status: {status}
    </li>
  </div>
);

RejectionHistoryItem.propTypes = {
  id: PropTypes.string,
  question: PropTypes.string,
  askee: PropTypes.string,
  status: PropTypes.string
};

export default RejectionHistoryItem;
