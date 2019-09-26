import React, { useState } from 'react';

function RejectionForm ({ score, createQuestion }) {

			const [currentAskee, setCurrentAskee] = useState('');
			const [currentQuestion, setCurrentQuestion] = useState('');
			const [currentlyRejected, setCurrentRejected] = useState(false);

	        return (
				<div>
					<h1 className="score">Score: {score}</h1>
					<form id='rejectionForm' onSubmit={() => createQuestion({ askee: currentAskee, question: currentQuestion, status: (currentlyRejected) ? 'rejected': 'accepted'})}>
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

export default RejectionForm;
