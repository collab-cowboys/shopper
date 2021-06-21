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
    dispatch(me);
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <Switch>
          <Route path="/home" component={Home} />
          <Redirect to="/home" />
        </Switch>
      ) : (
        <Switch>
          <Route path="/" exact component={Welcome} />
          <Route path="/login" render={() => <AuthForm name="login" />} />
          <Route path="/signup" render={() => <AuthForm name="signup" />} />
          <Route path="/products/:id" component={SingleProduct} />
          <Route path="/products" component={AllProducts} />
          <Route path="/cart" component={Cart} />
          <Routh path="/checkedout" component={CheckedOut} />
        </Switch>
      )}
    </div>
  );
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(Routes);
