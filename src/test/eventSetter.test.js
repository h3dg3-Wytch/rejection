import setter, { checkBoxSetter } from '../util/eventSetter';

describe( 'Setter for objects', () => {

    let state = {};

    const setFoo = value => state = {...state, value};

    it('sets the local state with the event logic', () => {
        const event = { target: { value: 'foo'} };
        setter(setFoo)(event);
        expect(state).toEqual({ value: 'foo' });
    });
    it('sets the local state with the checbox event logic', () => {
        const event = { target: { checked: true } };
        const converstionFunction = value => `${value}`;
        checkBoxSetter(setFoo)(converstionFunction)(event);
        expect(state).toEqual({ value: 'true' });
    });

});