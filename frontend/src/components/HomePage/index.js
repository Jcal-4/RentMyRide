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

	let sessionLinks = (
		<div>
			<h1 className="carContainer__header"> The Greatest Rides Await</h1>
			<ul className="carLinks">
				{cars?.slice(0, 6).map((car) => (
					<NavLink to={`/car/${car.id}`}>
						<div className="cardsContainer">
							<img className="carDisplay__homePage" src={car.carImage}></img>
							<li key={car.id}>{car.carModel}</li>
						</div>
					</NavLink>
				))}
			</ul>
		</div>
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
