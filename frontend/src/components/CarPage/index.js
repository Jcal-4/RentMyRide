import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import * as hostActions from "../../store/host";
import { Redirect } from "react-router-dom";

import "./CarPage.css";

function CarPage() {
	const dispatch = useDispatch();
	const { carId } = useParams(); // car being rendered on the page
	const car = useSelector((state) => state.car[carId]);
	const userId = useSelector((state) => state.session.user.id); // current session user

	// Set Variables using state
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");

	const onDelete = (e) => {
		e.preventDefault();

		dispatch(hostActions.removeCar(carId));
		return <Redirect to="/" />;
	};

	const onCreate = (e) => {
		e.preventDefault();

		console.log(startDate, "****", endDate);
		// return <Redirect to="/" />;
	};

	console.log(userId);
	console.log(car.userId);

	var today = new Date();
	var dd = String(today.getDate()).padStart(2, "0");
	var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
	var yyyy = today.getFullYear();
	today = yyyy + "-" + mm + "-" + dd;
	console.log(today);

	let chosenDate;

	if (startDate === "") {
		chosenDate = today;
	} else {
		chosenDate = startDate;
	}

	let sessionResult;
	// if the user matches the car then that user can delete that car
	if (userId === car.userId) {
		sessionResult = (
			<div>
				<form onSubmit={onDelete}>
					<button type="submit">Delete</button>
				</form>
			</div>
		);
	} else {
		// if the session user does not match the car then the session user can rent it
		sessionResult = (
			<div>
				<form onSubmit={onCreate}>
					<label>Start Date</label>
					<input
						type="date"
						value={chosenDate}
						onChange={(e) => setStartDate(e.target.value)}
						required
					></input>
					<label>End Date</label>
					<input
						type="date"
						value={endDate}
						onChange={(e) => setEndDate(e.target.value)}
						required
					></input>
					<button type="submit">Rent</button>
				</form>
			</div>
		);
	}

	return (
		<div>
			<h1>
				{car.carMake}, {car.carModel}
			</h1>
			<div>
				<img className="carDisplay__carPage" src={car.carImage}></img>
			</div>
			{sessionResult}
		</div>
	);
}

export default CarPage;
