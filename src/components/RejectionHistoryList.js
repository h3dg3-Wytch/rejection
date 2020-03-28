import React from 'react';
import PropTypes from 'prop-types';

import RejectionHistoryItem from './RejectionHistoryItem';

const RejectionHistoryList = ({ questions = [], auth }) => {
    if( questions && questions.questions) {
        questions = questions.questions;
    }

    if(questions && Object.keys(questions)) {
        questions = Object.keys(questions).map( key => questions[key] );
    }

    const rejectionListItems = (questions) ? getQuestionLensItems(questions) : [];
    return <div className='rejectionList'>{rejectionListItems}</div>
};

const getQuestionLensItems = questions => questions.map(question => <RejectionHistoryItem key={question.id} id={question.id} askee={question.askee} question={question.question} status={question.status}/>)

export default RejectionHistoryList;
