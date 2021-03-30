import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import CarPage from "./components/CarPage";
import HomePage from "./components/HomePage";
import LoginFormPage from "./components/LoginFormPage";
import Navigation from "./components/Navigation";
import NoMatch from "./components/NoMatch";
import SignupFormPage from "./components/SignUpPage";
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
					<Route>
						<NoMatch />
					</Route>
				</Switch>
			)}
		</div>
	);
}

export default App;
