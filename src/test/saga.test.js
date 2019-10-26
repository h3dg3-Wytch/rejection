import { persistState, getQuestions, loadLocalState } from '../sagas/sagas';
import { loadState } from '../util/localStorage';
describe('Test sagas', () => {
  it('perists state', () => {
    const gen = persistState({ type: 'FOO' });
    expect(gen.next().value.payload.selector).toEqual(getQuestions);
    expect(gen.next().value.payload.args.questions).toEqual(undefined);
    expect(gen.next().done).toEqual(true);
  });
  it('loads state', () => {
    const gen = loadLocalState({ type: 'FOO' });
    expect(gen.next().value.payload.fn).toEqual(loadState);
    expect(gen.next().value.payload.action.type).toEqual('INIT_LOAD');
    expect(gen.next().done).toEqual(true);
  });
});
