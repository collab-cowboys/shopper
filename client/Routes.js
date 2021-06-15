import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import AuthForm from './components/AuthForm';
import Home from './components/Home';
import Welcome from './components/Welcome';
import SingleProduct from './components/SingleProduct';
import AllProducts from './components/AllProducts';
import Cart from './components/Cart';
import { me } from './store';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

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
            <Route path="/signup" render={() => <AuthForm name="signup" /> } />
            <Route path="/products/:id" component={SingleProduct} />
            <Route path="/products" component={AllProducts} />
            <Route path="/cart" component={Cart} />
          </Switch>
        )}
      </div>
    );
  }
}
//render={(props) => <About {...props}  />}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
