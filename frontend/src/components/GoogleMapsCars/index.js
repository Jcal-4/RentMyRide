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
				<NavLink className="links" to={`/car/${car.id}`}>
					<div className="cardsContainer__mapPage">
						<img className="carDisplay__mapsPage" src={car.carImage}></img>
						<li key={car.id}>{car.carModel}</li>
					</div>
				</NavLink>
			))}
		</ul>
	);

	return <div className="carScroll">{sessionLinks}</div>;
}

export default GoogleMapCars;
