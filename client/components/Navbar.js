import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { handleLogout } from "../store";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(handleLogout());
  };
  return (
    <div>
      <h1>Grand-Shoppe</h1>
      <nav>
        {isLoggedIn ? (
          <span>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </span>
        ) : (
          <span>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </span>
        )}
        <span>
          <Link to="/products">All Grandparents</Link>
          <span>My Cart</span>
        </span>
      </nav>
      <hr />
    </div>
  );
};

export default Navbar;
