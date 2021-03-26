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
				<NavLink to="/login">Log In</NavLink>
				<NavLink to="/signup">Sign Up</NavLink>
			</>
		);
	}

	return (
		<ul>
			<li>
				<NavLink exact to="/">
					Home
				</NavLink>
				{isLoaded && sessionLinks}
			</li>
		</ul>
	);
}

export default Navigation;
