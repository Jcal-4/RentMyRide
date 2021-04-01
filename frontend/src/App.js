import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import CarPage from "./components/CarPage";
import GoogleMaps from "./components/GoogleMaps";
import HomePage from "./components/HomePage";
import HostForm from "./components/HostACar";
import LoginFormPage from "./components/LoginFormPage";
import Navigation from "./components/Navigation";
import NoMatch from "./components/NoMatch";
import SignupFormPage from "./components/SignUpPage";
import UserBookings from "./components/UserBookings";
import UserPage from "./components/UserPage";
import * as sessionActions from "./store/session";

function App() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false); // what is this loaded exactly?
	useEffect(() => {
		dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
	}, [dispatch]);

	return (
		<div>
			<Navigation isLoaded={isLoaded} />
			{isLoaded && (
				<Switch>
					<Route path="/" exact>
						<HomePage />
					</Route>
					<Route path="/login">
						<LoginFormPage />
					</Route>
					<Route path="/signup">
						<SignupFormPage />
					</Route>
					<Route path="/car/:carId">
						<CarPage />
					</Route>
					<Route path="/users/:username/bookings">
						<UserBookings />
					</Route>
					<Route path="/users/:userId">
						<UserPage />
					</Route>
					<Route path="/cars">
						<GoogleMaps />
					</Route>
					<Route path="/user/host">
						<HostForm />
					</Route>
					<Route>
						<NoMatch />
					</Route>
				</Switch>
			)}
		</div>
	);
}

export default App;
