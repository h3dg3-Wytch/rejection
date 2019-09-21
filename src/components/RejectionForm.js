import React, { useState } from 'react';
import { connect } from 'react-redux';

import { getScore } from '../reducer/RejectionReducer';
import { addAskee, addQuestion, checkRejected, createQuestion } from '../actions'; 

export function RejectionForm (props) {

			const [currentAskee, setCurrentAskee] = useState('');
			const [currentQuestion, setCurrentQuestion] = useState('');
			const [currentlyRejected, setCurrentRejected] = useState(false);

	        return (
				<div>
					<h1 className="score">Score: {props.score}</h1>
					<form id='rejectionForm' onSubmit={() => props.createQuestion({ askee: currentAskee, question: currentQuestion, status: (currentlyRejected) ? 'rejected': 'accepted'})}>
						<div>
							<label>
								Askee:
								<input type="text" id="rejectionAskeeTextInput" onChange={(e) => setCurrentAskee(e.target.value)} /> 
							</label> 
						</div>
						<div>
							<label>
								Question:
								<input type="text" id="rejectionQuestionTextInput" onChange={(e) => setCurrentQuestion(e.target.value)}/>
							</label>
							<label>
								Rejected:
								<input type="checkbox" id="rejectionCheckboxInput" onChange={(e) => setCurrentRejected(e.target.checked)}/>
							</label>
						</div>
						<div>
							<button>Submit</button>
						</div>
					</form>
				</div>
			);
}

function mapStateToProps(state) {
	return {
        score: getScore(state),
	}
}

const mapDispatchToProps = {
   addAskee,
   addQuestion, 
   checkRejected,
   createQuestion
};
    
export default connect(mapStateToProps, mapDispatchToProps)(RejectionForm);
