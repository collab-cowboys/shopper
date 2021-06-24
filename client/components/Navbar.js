import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { handleLogout } from '../store';

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  const dispatch = useDispatch();
  const name = useSelector((state) => state.auth.username);
  const handleClick = () => {
    dispatch(handleLogout());
  };
  return (
    <div id="navbar">
      <h1 className="title">Grand-Shoppe</h1>
      <nav>
        {isLoggedIn ? (
          <span id="logged-in">
            {/* The navbar will show these links after you log in */}
            <span>Logged in as {name}</span>
            <button className="button is-danger" type="button">
              <Link to="/" onClick={handleClick}>
                Logout
              </Link>
            </button>
          </span>
        ) : (
          <span id="login">
            {/* The navbar will show these links before you log in */}
            <button className="button is-danger" type="button">
              <Link to="/login">Login</Link>
            </button>
            <button className="button is-danger" type="button">
              <Link to="/signup">Sign Up</Link>
            </button>
          </span>
        )}
        <span id="products">
          <button className="button is-danger" type="button">
            <Link to="/products">All Grandparents</Link>
          </button>
          <button className="button is-danger" type="button">
            <Link to="/cart">My Cart</Link>
          </button>
        </span>
      </nav>
      <hr id="nav-break" />
    </div>
  );
};

export default Navbar;
