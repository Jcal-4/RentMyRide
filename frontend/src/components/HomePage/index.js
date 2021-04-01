import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import * as carActions from "../../store/car";
import "./HomePage.css";

import { useDispatch, useSelector } from "react-redux";

function HomePage() {
	const dispatch = useDispatch();
	const cars = useSelector((state) => {
		return state.car.carsList;
	});
	useEffect(() => {
		dispatch(carActions.getCars());
	}, [dispatch]);

	console.log(cars); // car no render

	// {<img src={cars[1].carImage}></img>}

	let sessionLinks = (
		<ul className="carLinks">
			{cars?.map((car) => (
				<NavLink to={`/car/${car.id}`}>
					<li key={car.id}>{car.carModel}</li>
					<img className="carDisplay__homePage" src={car.carImage}></img>
				</NavLink>
			))}
		</ul>
	);
	// if (!cars) return null;

	return (
		<div>
			<img src="images/RentMyRideBanner.jpg" className="banner" />
			<div className="carsContainer"></div>
			{sessionLinks}
		</div>
	);
}

export default HomePage;
