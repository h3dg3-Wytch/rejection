import getQuestion from './RejectionReducer';

const createQuestion = ({question = '', askee = 'anon', status ='unanswered'} = {}) => ({
	type: createQuestion.type,
  	payload: {question, askee, status} 
});
createQuestion.type = 'rejectionReducer/createQuestion';

const addAskee = event => ({
    type: addAskee.type,
    payload: { askee: event.target.value }
});
addAskee.type = 'rejectionReducer/addAskee';

const addQuestion = event => ({
    type: addQuestion.type,
    payload: { question: event.target.value }
});
addQuestion.type = 'rejectionReducer/addQuestion';

const checkRejected = event => ({
    type: checkRejected.type,
    payload: { rejected: event.target.checked }
});
checkRejected.type = 'rejectionReducer/checkRejected';

const click = (e) => {
    e.preventDefault();
    return { type: 'temp'};
};

export { createQuestion, click, addAskee, addQuestion, checkRejected };