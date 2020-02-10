import cuid from 'cuid';

const createQuestion = ({
  id = cuid(),
  question = '',
  askee = 'anon',
  status = 'unanswered',
  timestamp = new Date().getTime()
} = {}) => ({
  type: createQuestion.type,
  payload: { id, question, askee, status, timestamp }
});
createQuestion.type = 'rejectionReducer/createQuestion';

const addAskee = value => ({
  type: addAskee.type,
  payload: { askee: value }
});
addAskee.type = 'rejectionReducer/addAskee';

const addQuestion = value => ({
  type: addQuestion.type,
  payload: { question: value }
});
addQuestion.type = 'rejectionReducer/addQuestion';

const checkRejected = checked => ({
  type: checkRejected.type,
  payload: { rejected: checked }
});
checkRejected.type = 'rejectionReducer/checkRejected';

const loadUser = user => ({
  type: loadUser.type,
  payload: { user }
});
loadUser.type = 'rejectionReducer/loadUser';

export { createQuestion, addAskee, addQuestion, checkRejected, loadUser };
