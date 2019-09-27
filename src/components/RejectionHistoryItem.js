import React from 'react';

const RejectionHistoryItem = ({ id, question, askee, status }) => (
  <div>
    <li key={id}>
      Question: {question} Askee: {askee} Status: {status}
    </li>
  </div>
);
export default RejectionHistoryItem;
