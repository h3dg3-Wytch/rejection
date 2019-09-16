import { loadState, saveState } from '../util/localStorage';
describe( 'Local Storage', () => {
    const state = { questions: [] };

    it('saves to local storage', () => {
        saveState(state);
        expect(JSON.parse(window.localStorage.getItem('state'))).toEqual(state);
    });

    it('saves to local storage', () => {
        const rejectionState = loadState();
        expect(rejectionState).toEqual(state);
    });
});