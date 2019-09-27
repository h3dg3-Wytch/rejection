import React from 'react';
import logo from '../logo.svg';
import '../App.css';

import RejectionForm from './RejectionForm';

import { getScore } from '../reducer/RejectionReducer';
import { createQuestion } from '../actions';

import { connect } from 'react-redux';

import PropTypes from 'prop-types';

function App({ score, createQuestion }) {
  return (
    <div className="App">
      <RejectionForm score={score} createQuestion={createQuestion} />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    score: getScore(state)
  };
}

const mapDispatchToProps = {
  createQuestion
};

App.propTypes = {
  score: PropTypes.number,
  createQuestion: PropTypes.func
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
