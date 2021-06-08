import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

import { showModal, setCurrentModal, hideModal } from "../../store/modal";
import LoginFormPage from "../LoginFormPage/Login";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [about, setAbout] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const showLogin = () => {
    dispatch(setCurrentModal(LoginFormPage));
    dispatch(showModal());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      dispatch(hideModal());
      return dispatch(
        sessionActions.signup({
          email,
          username,
          password,
          firstName,
          lastName,
          about,
          city,
          state,
          address,
          profileImageUrl,
        })
      ).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
    }
    return setErrors([
      "Confirm Password field must be the same as the Password field",
    ]);
  };

  return (
    <div className="signUpForm">
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <div className="login__holder">
          <div>
            <label className="login__text">Email</label>
          </div>
          <input
            className="input_review"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="login__holder">
          <div>
            <label className="login__text">Username</label>
          </div>
          <input
            className="input_review"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="login__holder">
          <div>
            <label className="login__text">First Name</label>
          </div>
          <input
            className="input_review"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="login__holder">
          <div>
            <label className="login__text">Last Name</label>
          </div>
          <input
            className="input_review"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="login__holder">
          <div>
            <label className="login__text">About</label>
          </div>
          <input
            className="input_review"
            type="text"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            required
          />
        </div>
        <div className="login__holder">
          <div>
            <label className="login__text">City</label>
          </div>
          <input
            className="input_review"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div className="login__holder">
          <div>
            <label className="login__text">State</label>
          </div>
          <input
            className="input_review"
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </div>
        <div className="login__holder">
          <div>
            <label className="login__text">Address</label>
          </div>
          <input
            className="input_review"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="login__holder">
          <div>
            <label className="login__text">Profile Image Url</label>
          </div>
          <input
            className="input_review"
            type="text"
            value={profileImageUrl}
            onChange={(e) => setProfileImageUrl(e.target.value)}
            required
          />
        </div>
        <div className="login__holder">
          <div>
            <label className="login__text">Password</label>
          </div>
          <input
            className="input_review"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="login__holder">
          <div>
            <label className="login__text">Confirm Password</label>
          </div>
          <input
            className="input_review"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="signUpButton__signup">
          <button className="login__button" type="submit">
            Sign Up
          </button>
        </div>
        <div className="logRedirects">
          <div className="signupButton__signup">
            <div>
              <button className="login__button" onClick={showLogin}>
                Login
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignupFormPage;
