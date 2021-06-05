import React from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import { showModal, setCurrentModal } from "../../store/modal";
import LoginFormPage from "../LoginFormPage/Login";
import SignupFormPage from "../SignUpPage/index";

import "./Navigation.css";

function Navigation({ isLoaded }) {
  const dispatch = useDispatch();

  const showLogin = () => {
    dispatch(setCurrentModal(LoginFormPage));
    dispatch(showModal());
  };

  const showSignUp = () => {
    dispatch(setCurrentModal(SignupFormPage));
    dispatch(showModal());
  };

  // pull the user from the store
  const sessionUser = useSelector((state) => state.session.user);
  let sessionLinks;
  // check to see if there is a user or not and depending on that we render differently on the navbar
  if (sessionUser) {
    const logout = (e) => {
      e.preventDefault();
      dispatch(sessionActions.logout());
    };
    // sessionLinks = <ProfileButton user={sessionUser} />;
    sessionLinks = (
      <button className="logoutButton" onClick={logout}>
        Log Out
      </button>
    );
  } else {
    sessionLinks = (
      <div className="login_signup_container">
        <div>
          <p onClick={showLogin} className="login_button">
            Login
          </p>
        </div>
        <div className="signUpButton_signup">
          <p onClick={showSignUp}>Signup</p>
        </div>
      </div>
    );
  }

  return (
    <div className="navbar">
      <div className="logo">
        <NavLink exact to="/" className="home">
          <h2>Rent My Ride</h2>
        </NavLink>
      </div>
      <div className="navbarCenter">
        <div>
          <NavLink to="/cars">
            <button className="rentCar">Rent</button>
          </NavLink>
        </div>
        <div>
          <NavLink to="/user/host">
            <button className="hostCar">Host</button>
          </NavLink>
        </div>
      </div>
      <ul className="navLinks">
        <li>
          {sessionUser && (
            <div>
              <NavLink to={`/users/${sessionUser.username}/bookings`}>
                <button className="bookingsButton">My Bookings</button>
              </NavLink>
              <NavLink to={`/users/${sessionUser.id}`}>
                <button className="profileButton">Profile</button>
              </NavLink>
            </div>
          )}
        </li>
        <li>{isLoaded && sessionLinks}</li>
      </ul>
    </div>
  );
}

export default Navigation;
