import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
	// pull the user from the store
	const sessionUser = useSelector((state) => state.session.user);

	let sessionLinks;
	// check to see if there is a user or not and depending on that we render differently on the navbar
	if (sessionUser) {
		sessionLinks = <ProfileButton user={sessionUser} />;
	} else {
		sessionLinks = (
			<>
				<NavLink to="/login" className="login">
					Login
				</NavLink>
				<NavLink to="/signup" className="signUp">
					Signup
				</NavLink>
			</>
		);
	}

	return (
		<div className="navbar">
			<div className="logo">
				<NavLink exact to="/" className="homeButton">
					Home
				</NavLink>
			</div>
			<div className="searchBar">
				<p>a search bar will go here</p>
			</div>
			<ul className="navLinks">
				<li>
					{isLoaded && sessionLinks}
				</li>
			</ul>
		</div>
	);
}

export default Navigation;
