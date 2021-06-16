/* global describe beforeEach it */

import { expect } from 'chai';
import React from 'react';
import enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
const { JSDOM } = require('jsdom');
import { Provider } from 'react-redux';
import AllProducts from './AllProducts';
import store from '../store';

const adapter = new Adapter();
enzyme.configure({ adapter });

describe('AllProducts', () => {
  let allProducts;

  beforeEach(() => {
    const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
    const { window } = jsdom;

    global.window = window;
    global.document = window.document;
    global.navigator = {
      userAgent: 'node.js',
    };

    allProducts = mount(
      <Provider store={store}>
        <AllProducts />
      </Provider>
    );
  });

  it('renders seeded components from redux store', () => {
    const reduxLength = store.getState().allProducts.length;
    console.log(reduxLength);
    expect(allProducts.find('li')).to.have.lengthOf(reduxLength);
  });
});
