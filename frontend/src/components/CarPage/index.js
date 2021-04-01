import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import * as hostActions from "../../store/host";
import { Redirect } from "react-router-dom";

import "./CarPage.css";

function CarPage() {
	const dispatch = useDispatch();

	const { carId } = useParams();
	const car = useSelector((state) => state.car[carId]);

	const onSubmit = (e) => {
		e.preventDefault();

		dispatch(hostActions.removeCar(carId));
		return <Redirect to="/" />;
	};

	return (
		<div>
			<h1>
				{car.carMake}, {car.carModel}
			</h1>
			<div>
				<img className="carDisplay__carPage" src={car.carImage}></img>
			</div>
			<div>
				<form onSubmit={onSubmit}>
					<button type="submit">Delete</button>
				</form>
			</div>
		</div>
	);
}

export default CarPage;
