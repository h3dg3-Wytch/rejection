import React from 'react';
import { connect } from 'react-redux';

import { getScore, getCurrentQuestion } from './RejectionReducer';
import { addAskee, addQuestion, checkRejected, createQuestion } from './actions'; 

export class RejectionForm extends React.Component {
    // to do write test that checks for the score
    render() {
        return <div>
            <h1 className="score">Score: {this.props.score}</h1>
            <form id='rejectionForm' onSubmit={(e) =>
                {
                    e.preventDefault();
                    this.props.createQuestion(this.props.question)
                    clearForm();
                }}>
		<div>
			<label>
			    Askee:
			    <input type="text" id="rejectionAskeeTextInput"onChange={(e) => this.props.addAskee(e)} /> 
			</label> 
		</div>
		<div>
			<label>
			    Question:
			    <input type="text" id="rejectionQuestionTextInput" onChange={(e) => this.props.addQuestion(e)}/>
			</label>
			<label>
			    Rejected:
			    <input type="checkbox" id="rejectionCheckboxInput" onChange={(e) => this.props.checkRejected(e)}/>
			</label>
		</div>
		<div>
            <button>Submit</button>
		</div>
            </form>
        </div>;
    }
}

const clearForm = () => document.getElementById('rejectionForm').reset();

function mapStateToProps(state) {
	return {
        score: getScore(state),
        question: getCurrentQuestion(state)
	}
}

const mapDispatchToProps = {
   addAskee,
   addQuestion, 
   checkRejected,
   createQuestion
};
    
export default connect(mapStateToProps, mapDispatchToProps)(RejectionForm);
