import { persistState, getQuestions, loadLocalState } from '../sagas/sagas';
import { loadState } from '../util/localStorage';

import firebase from 'firebase/app';

jest.mock("firebase/app", () => {
  const data = { name: "questions" };
  const snapshot = { val: () => data };
  return {
    initializeApp: jest.fn().mockReturnValue({
      database: jest.fn().mockReturnValue({
        ref: jest.fn().mockReturnThis(),
        once: jest.fn(() => Promise.resolve(snapshot))
      })
    }),
    apps: { length: 1},
    ref: () => ({ set: () => data})
  };
});

describe('Test sagas', () => {
  it('perists state', () => {
    const gen = persistState({ type: 'FOO' });
    expect(gen.next().value.payload.selector).toEqual(getQuestions);
    expect(gen.next().value.payload.args.questions).toEqual(undefined);
    expect(gen.next().value.name).toEqual('questions');
    expect(gen.next().done).toEqual(true);
  });
  it('loads state', () => {
    const gen = loadLocalState({ type: 'FOO' });
    expect(gen.next().value.payload.fn).toEqual(loadState);
    expect(gen.next().value.payload.action.type).toEqual('INIT_LOAD');
    expect(gen.next().done).toEqual(true);
  });
});
