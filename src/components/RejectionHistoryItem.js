import React from 'react';
import PropTypes from 'prop-types';

const RejectionHistoryItem = ({ id, question, askee, status }) => (
    <li key={id}>
      Question: {question} Askee: {askee} Status: {status}
    </li>
);

RejectionHistoryItem.propTypes = {
  id: PropTypes.string,
  question: PropTypes.string,
  askee: PropTypes.string,
  status: PropTypes.string
};

export default RejectionHistoryItem;
