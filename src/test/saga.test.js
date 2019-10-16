import { createSagaQuestion } from '../sagas/sagas';

describe('Test sagas', () => {
  it('does a thing', () => {
    const gen = createSagaQuestion({ payload: {} });
    expect(gen.next().value.payload.action.type).toEqual(
      'rejectionReducer/createQuestion'
    );
    expect(gen.next().done).toEqual(true);
  });
});
