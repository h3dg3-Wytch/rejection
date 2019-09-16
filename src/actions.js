import cuid from 'cuid';

const createQuestion = ({ id = cuid(), question = '', askee = 'anon', status ='unanswered', timestamp = new Date().getTime()} = {}) => ({
	type: createQuestion.type,
  	payload: {id, question, askee, status, timestamp} 
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

export { createQuestion, addAskee, addQuestion, checkRejected };