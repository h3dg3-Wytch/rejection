
import React from 'react';
import { shallow, mount, render, configure } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';


import  RejectionHistoryItem from '../components/RejectionHistoryItem';

configure({adapter: new Adapter()});

describe('Rejection Form component', () => {
	
	let component;
	const question = {id: 1, question: 'May I have a raise?', askee: 'boss', status: 'rejected', timestampe: 1234567890 };

	beforeEach(() => {
	  component = shallow(<RejectionHistoryItem />);
	});

	it('should load this file', () => {
		expect(component.contains(<RejectionHistoryItem/>)).toEqual(false);
	});

	it('has a list item', () => {
	   expect(component.exists('li')).toEqual(true);
	});

	it('has a question, askee, and status', () => {
		expect(component.find('li').text()).toEqual('Question:  Askee:  Status: ');
	});


});
