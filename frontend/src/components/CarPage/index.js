import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import * as hostActions from "../../store/host";
import * as bookingActions from "../../store/bookings";
import * as reviewActions from "../../store/review";
import { Redirect } from "react-router-dom";

import "./CarPage.css";

function CarPage() {
	let history = useHistory();
	const dispatch = useDispatch();
	let { carId } = useParams(); // car being rendered on the page
	const car = useSelector((state) => state.car[carId]);
	const reviews = useSelector((state) => state.review.review);
	let sessionUser = useSelector((state) => state.session.user); // current session user
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	let [rating, setRating] = useState("");

	const onDelete = (e) => {
		e.preventDefault();
		dispatch(hostActions.removeCar(carId));
		history.push("/");
	};

	const onCreate = (e) => {
		e.preventDefault();
		carId = parseInt(carId, 10);
		let userId = sessionUser.id;
		dispatch(
			bookingActions.createBookings({ userId, carId, startDate, endDate })
		);
		history.push(`/users/${sessionUser.username}/bookings/`);
	};

	const onReview = (e) => {
		e.preventDefault();
		carId = parseInt(carId, 10);
		rating = parseInt(rating, 10);
		let userId = sessionUser.id;
		dispatch(
			reviewActions.postReview({
				authorId: userId,
				carId,
				title,
				description,
				rating,
			})
		);
		setTitle("");
		setDescription("");
		setRating("");
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

	let commentsView;
	let sessionResult;
	// if the user matches the car then that user can delete that car
	if (sessionUser) {
		if (sessionUser.id === car.userId) {
			sessionResult = (
				<div className="deleteContainer">
					<form onSubmit={onDelete}>
						<button className="deleteCar" type="submit">
							Remove Car
						</button>
					</form>
				</div>
			);
		} else {
			// if the session user does not match the car then the session user can rent it
			sessionResult = (
				<div>
					<form className="rentCarr" onSubmit={onCreate}>
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
						<button className="rentCar__button" type="submit">
							Rent
						</button>
					</form>
				</div>
			);
		}

		// Here we will decide whether or not to render a section to comment with
		if (sessionUser.id === car.userId) {
			commentsView = <h1></h1>;
		} else {
			commentsView = (
				<div className="reviewForm">
					<form className="reviewFormm" onSubmit={onReview}>
						<div>
							<div>
								<label>Title</label>
							</div>
							<input
								type="text"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							></input>
						</div>
						<div>
							<div>
								<label>Description</label>
							</div>
							<input
								type="text"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							></input>
						</div>
						<div>
							<div>
								<label>Rating</label>
							</div>
							<input
								type="number"
								value={rating}
								onChange={(e) => setRating(e.target.value)}
							></input>
						</div>
						<div>
							<button className="submitReview__button" type="submit">
								Submit Review
							</button>
						</div>
					</form>
				</div>
			);
		}
	}

	return (
		<div className="carPageHolder">
			<h1 className="carRentee">
				{car.carMake}, {car.carModel}, for rent by {car.User.firstName}{" "}
				{car.User.lastName}
			</h1>
			<div>
				<img className="carDisplay__carPage" src={car.carImage}></img>
			</div>
			<ul className="carDetails">
				<li>Price Per Day: ${car.pricePerDay}</li>
				<li>Year: {car.carYear}</li>
				<li>Number of Seats: {car.seats}</li>
				<li>{car.electric}</li>
				<li>Autonomous: {car.autonomous}</li>
				<li>Roadside Assistance: {car.roadsideAssistance}</li>
			</ul>
			{sessionResult}
			<div>
				<ul className="reviewContainer">
					{car.Reviews?.map((review) => (
						<li key={review.id}>
							<div className="title">
								{review.title} Rating {review.rating}
							</div>
							<div>{review.description}</div>
						</li>
					))}
					{console.log(reviews)}
					{reviews?.map((review) => (
						<li className="carReviews" key={review.id}>
							<div className="title__addon">
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
