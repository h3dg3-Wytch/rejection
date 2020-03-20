import React from 'react';
import PropTypes from 'prop-types';

import RejectionHistoryItem from './RejectionHistoryItem';

const RejectionHistoryList = ({ questions = [] }) => {
    if( questions && questions.questions) {
        questions = questions.questions;
    }
    const rejectionListItems = getQuestionLensItems(questions);
    return <div className='rejectionList'>{rejectionListItems}</div>
};

const getQuestionLensItems = questions => questions.map(question => <RejectionHistoryItem id={question.id} askee={question.askee} question={question.question} status={question.status}/>)

export default RejectionHistoryList;
