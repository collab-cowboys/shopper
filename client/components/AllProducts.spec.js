/* global describe beforeEach it */

import { expect } from "chai";
import React from "react";
import enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import waitForExpect from "wait-for-expect";
const { JSDOM } = require("jsdom");

import { Provider } from "react-redux";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { Router } from "react-router-dom";
import AllProducts from "./AllProducts";
import store from "../store";
import history from "../history";
const adapter = new Adapter();
enzyme.configure({ adapter });

const mock = new MockAdapter(axios);

describe("AllProducts", () => {
  let products = [{ id: 1 }, { id: 2 }];

  beforeEach(() => {
    const jsdom = new JSDOM("<!doctype html><html><body></body></html>");
    const { window } = jsdom;

    global.window = window;
    global.document = window.document;
    global.navigator = {
      userAgent: "node.js",
    };
    mock.onGet("/api/products").replyOnce(200, products);
  });
  afterEach(() => mock.reset());

  it("renders seeded data from redux store", async () => {
    let allProducts = mount(
      <Router history={history}>
        <Provider store={store}>
          <AllProducts />
        </Provider>
      </Router>
    );
    await waitForExpect(() => {
      allProducts.update();

      const reduxLength = store.getState().allProducts.length;
      console.log(reduxLength);
      console.log(store.getState());
      expect(allProducts.find("li")).to.have.lengthOf(reduxLength);
    }, 1500);
  });
});
