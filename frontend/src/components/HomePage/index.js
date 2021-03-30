import React, { useState, useEffect } from "react";

import Navigation from "../Navigation";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";

function HomePage() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false); // what is this loaded exactly?
	useEffect(() => {
		dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
	}, [dispatch]);
	return (
		<div>
			<Navigation isLoaded={isLoaded} />
		</div>
	);
}

export default HomePage;
