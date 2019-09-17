import React from 'react';

const RejectionHistoryItem = ({ id, question, askee, status, timestamp }) => 
	<div>
		<li key={id}>Question: {question} Askee: {askee} Status: </li>
	</div>
export default RejectionHistoryItem;
