import React, { useState, useEffect } from "react";
import * as carActions from "../../store/car";
import "./HomePage.css";

import { useDispatch, useSelector } from "react-redux";

function HomePage() {
	const dispatch = useDispatch();
	const cars = useSelector((state) => {
		return state.car;
	});
	useEffect(() => {
		dispatch(carActions.getCars());
	}, [dispatch]);

	if (!cars) {
		return null;
	}
	console.log(cars);
	// console.log(cars[1]);
	// console.log(image);

	// let image = cars[1].carImage; // why does this disappear on a refresh an d break everything?
	// <img src={image}></img>
	// {<img src={cars[1].carImage}></img>}
	return (
		<div>
			{}
			<img src="images/RentMyRideBanner.jpg" className="banner" />
			<div className="carsContainer"></div>
		</div>
	);
}

export default HomePage;
