import React from 'react';
import { shallow, mount, render, configure } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';


import RejectionForm from '../components/RejectionForm';

// todo
// create form component, test that this component 
// has everything X
// add react-redux X
// create reducer 
// test reducer
// link up form to state
// functional tests
// styling?? 
configure({adapter: new Adapter()});

describe('Rejection Form component', () => {
	
	let component;

	beforeEach(() => {
		component = shallow(<RejectionForm score="3"/>);
	});

	it('should load this file', () => {
		expect(component.contains(<RejectionForm />)).toEqual(false);
	});

	it('should display a score', () => {
		expect(component.exists('h1.score')).toEqual(true);
	});


	it('should have a form', () => {
		expect(component.exists('form')).toEqual(true);
	});

	it('should have three inputs and a button', () => {
		expect(component.find('input').length).toEqual(3);
		expect(component.exists('button')).toEqual(true);
	});

	it('should have a score of 3 ', () => {
		expect(component.find('h1.score').text()).toEqual('Score: 3');
	});
});
