import React from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";

import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
	const dispatch = useDispatch();

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
					<img src="images/Logo.png" className="logo" />
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
