import { createQuestion, addAskee, addQuestion, checkRejected } from './actions';
import { stat } from 'fs';

const initialState = { questions: [] };
const reducer = (state = initialState, { payload, type } = {}) => {
	switch(type) {
        case createQuestion.type: 
            return {...state, questions: state.questions.concat([payload]) };
        case addAskee.type:
            return { ...state, currentAskee: payload.askee };
        case addQuestion.type:
            return { ...state, currentQuestion: payload.question };
        case checkRejected.type:
            return { ...state, currentlyRejected: payload.rejected };
		default:
			return state;
	}
}

const getScore = (state) => 
	state.questions.reduce( (acc, question) => 
		(question.status === 'rejected') ? acc + 10 : 
		(question.status === 'accepted') ? acc + 1 :
        acc, 0);

const getCurrentQuestion = (state) => 
    ({ question: state.currentQuestion, askee: state.currentAskee, status: (state.currentlyRejected) ? 'rejected': 'accepted' });

export { reducer, getScore, getCurrentQuestion };

