import {
  reducer,
  getScore,
  getCurrentQuestion
} from '../reducer/RejectionReducer.js';

import {
  createQuestion,
  addAskee,
  addQuestion,
  checkRejected
} from '../actions.js';

describe.only('rejection reducer', () => {
  const questions = [
    createQuestion({
      id: 1,
      question: 'May I have a raise?',
      askee: 'Boss',
      status: 'rejected',
      timestamp: 1234567890,
      type: createQuestion.type,
      owner: 'user123'
    }),
    createQuestion({
      id: 2,
      question: 'May I have an extra scoop of ice-cream?',
      askee: 'Baskin Robbins',
      status: 'rejected',
      timestamp: 1234567890,
      type: createQuestion.type
    }),
    createQuestion({
      id: 3,
      question: 'May I have some apple pie?',
      askee: 'Mom',
      status: 'accepted',
      timestamp: 1234567890,
      type: createQuestion.type
    })
  ];

  const acceptedQuestions = {
    questions: [
      {
        id: 1,
        question: 'May I have a raise?',
        askee: 'Boss',
        status: 'rejected',
        timestamp: 1234567890,
        owner: 'user123'
      },
      {
        id: 2,
        question: 'May I have an extra scoop of ice-cream?',
        askee: 'Baskin Robbins',
        status: 'rejected',
        timestamp: 1234567890,
        owner: ''
      },
      {
        id: 3,
        question: 'May I have some apple pie?',
        askee: 'Mom',
        status: 'accepted',
        timestamp: 1234567890,
        owner: ''
      }
    ]
  };

  const auth = {
    uid: 'user123'
  };

  it('returns an initial state', () => {
    expect(reducer()).toEqual({ questions: [] });
  });

  it('returns the questions', () => {
    expect(questions.reduce(reducer, reducer())).toEqual(acceptedQuestions);
  });

  it.only('returns the score with the associated id', () => {
    expect(getScore({ questions: acceptedQuestions.questions, auth })).toEqual(
      10
    );
  });

  it('can add askee inputs', () => {
    const event = { target: { value: 'Boss' } };
    const askeeQuestion = addAskee(event.target.value);
    expect(reducer(reducer(), askeeQuestion)).toEqual({
      questions: [],
      currentAskee: 'Boss'
    });
  });

  it('can add question inputs', () => {
    const event = { target: { value: 'May I take a break?' } };
    const query = addQuestion(event.target.value);
    expect(reducer(reducer(), query)).toEqual({
      questions: [],
      currentQuestion: 'May I take a break?'
    });
  });

  it('can determine if rejected or not', () => {
    const event = { target: { checked: true } };
    const rejected = checkRejected(event.target.checked);
    expect(reducer(reducer(), rejected)).toEqual({
      questions: [],
      currentlyRejected: true
    });
  });

  it('can determine the current question', () => {
    const state = {
      currentQuestion: 'May I have a raise?',
      currentAskee: 'Boss',
      currentlyRejected: true
    };
    expect(getCurrentQuestion(state)).toEqual({
      question: 'May I have a raise?',
      askee: 'Boss',
      status: 'rejected'
    });
  });
});
