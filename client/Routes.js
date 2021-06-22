import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import Home from './components/Home';
import Welcome from './components/Welcome';
import SingleProduct from './components/SingleProduct';
import AllProducts from './components/AllProducts';
import Cart from './components/Cart';
import CheckedOut from './components/CheckedOut';
import { me } from './store';

/**
 * COMPONENT
 */
const Routes = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => !!state.auth.id);

  const loadInitialData = () => {
    dispatch(me());
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  return (
    <div>
        <Switch>
          <Route exact path="/">
             <Welcome />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/login"> 
            <AuthForm name="login" />
          </Route>
          <Route path="/signup">
            <AuthForm name="signup" />
          </Route>
          <Route path="/products/:id">
            <SingleProduct />
          </Route>
          <Route path="/products">
            <AllProducts />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/checkedout">
             <CheckedOut />
          </Route>
        </Switch>
    </div>
  );
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(Routes);
