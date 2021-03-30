import React, { useState, useEffect } from "react";
import * as carActions from "../../store/car";

import { useDispatch, useSelector } from "react-redux";

function HomePage() {
	const dispatch = useDispatch();
	const cars = useSelector((state) => {
		return state.car;
	});
	useEffect(() => {
		dispatch(carActions.getCars());
	}, [dispatch]);
	if (cars == []) {
		return null;
	}
	console.log(cars[1]);
	// console.log(image);

	let image = cars[1].carImage; // why does this disappear on a refresh an d break everything?
	// <img src={image}></img>

	return (
		<div>
			<h1>testing home page</h1>
			<div className="carImage"></div>
			<img src={image}></img>
		</div>
	);
}

export default HomePage;
