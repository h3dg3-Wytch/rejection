import React from 'react';
import logo from './logo.svg';
import './App.css';

import RejectionForm from './RejectionForm';
import { click, addAskee, checkRejected, createQuestion } from './actions';
function App() {
  return (
    <div className="App">
     <RejectionForm click={click} addAskee={addAskee} checkRejected={checkRejected} createQuestion={createQuestion} /> 
    </div>
  );
}

export default App;
