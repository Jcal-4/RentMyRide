import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./CarPage.css";

function CarPage() {
	const { carId } = useParams();
	const car = useSelector((state) => state.car[carId]);
	// console.log(car);
	return (
		<div>
			<h1>
				{car.carMake}, {car.carModel}
			</h1>
			<div>
				<img className="carDisplay__carPage" src={car.carImage}></img>
			</div>
		</div>
	);
}

export default CarPage;
