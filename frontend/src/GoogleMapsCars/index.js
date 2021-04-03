import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import "./GoogleMapsCars.css";

function GoogleMapCars() {
	const cars = useSelector((state) => state.carlocation.carLocations);
	console.log(cars);

	let sessionLinks = (
		<ul className="carLinks__maps">
			{cars?.map((car) => (
				<NavLink to={`/car/${car.id}`}>
					<li key={car.id}>{car.carModel}</li>
					<img className="carDisplay__mapsPage" src={car.carImage}></img>
				</NavLink>
			))}
		</ul>
	);

	return <div>{sessionLinks}</div>;
}

export default GoogleMapCars;
