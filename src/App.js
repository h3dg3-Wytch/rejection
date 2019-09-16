import React from 'react';
import logo from './logo.svg';
import './App.css';

import RejectionForm from './RejectionForm';
import { addAskee, checkRejected, createQuestion } from './actions';
function App() {
  return (
    <div className="App">
     <RejectionForm addAskee={addAskee} checkRejected={checkRejected} createQuestion={createQuestion} /> 
    </div>
  );
}

export default App;
