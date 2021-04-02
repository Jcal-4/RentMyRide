import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import * as hostActions from "../../store/host";
import * as bookingActions from "../../store/bookings";
import * as reviewActions from "../../store/review";
import { Redirect } from "react-router-dom";

import "./CarPage.css";

function CarPage() {
	const dispatch = useDispatch();
	let { carId } = useParams(); // car being rendered on the page
	const car = useSelector((state) => state.car[carId]);
	const userId = useSelector((state) => state.session.user.id); // current session user
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	let [rating, setRating] = useState("");

	const onDelete = (e) => {
		e.preventDefault();
		dispatch(hostActions.removeCar(carId));
		return <Redirect to="/" />;
	};

	const onCreate = (e) => {
		e.preventDefault();
		carId = parseInt(carId, 10);
		dispatch(
			bookingActions.createBookings({ userId, carId, startDate, endDate })
		);
		// return <Redirect to="/" />;
	};

	const onReview = (e) => {
		e.preventDefault();
		carId = parseInt(carId, 10);
		rating = parseInt(rating, 10);
		dispatch(
			reviewActions.postReview({
				authorId: userId,
				carId,
				title,
				description,
				rating,
			})
		);
	};

	let today = new Date();
	let dd = String(today.getDate()).padStart(2, "0");
	let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
	let yyyy = today.getFullYear();
	today = yyyy + "-" + mm + "-" + dd;
	// the following will make it so that the starting date on the input will
	// be on the date that the user is accessing the page
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

	// Here we will decide whether or not to render a section to comment with
	let commentsView;
	if (userId !== car.userId) {
		commentsView = <h1>I can't comment it's my own car!</h1>;
	} else {
		commentsView = (
			<div>
				<form onSubmit={onReview}>
					<div>
						<label>Title</label>
						<input
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						></input>
					</div>
					<div>
						<label>Description</label>
						<input
							type="text"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						></input>
					</div>
					<div>
						<label>Rating</label>
						<input
							type="number"
							value={rating}
							onChange={(e) => setRating(e.target.value)}
						></input>
					</div>
					<button type="submit">Submit Review</button>
				</form>
			</div>
		);
	}

	return (
		<div>
			<h1>
				{car.carMake}, {car.carModel}, for rent by {car.User.firstName}{" "}
				{car.User.lastName}
			</h1>
			<div>
				<img className="carDisplay__carPage" src={car.carImage}></img>
			</div>
			{sessionResult}
			<div>
				<ul className="reviewContainer">
					{car.Reviews?.map((review) => (
						<li key={review.id}>
							<div>
								{review.title} Rating {review.rating}
							</div>
							<div>{review.description}</div>
						</li>
					))}
				</ul>
			</div>
			{commentsView}
		</div>
	);
}

export default CarPage;
