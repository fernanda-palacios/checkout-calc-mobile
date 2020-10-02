import React from 'react';
import renderer from 'react-test-renderer';
import firebase from './firebase';


import App from './App';

describe('<App />', () => {

  firebase.firestore = jest.fn()

  it('renders correctly', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
});
});