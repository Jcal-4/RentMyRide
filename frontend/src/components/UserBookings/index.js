import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as bookingActions from "../../store/bookings";
import "./UserBookings.css";

function UserBookings() {
	const dispatch = useDispatch();
	const User = useSelector((state) => state.session.user);
	const userBooking = useSelector(
		(state) => state.booking.bookingInfo.Bookings
	);

	// console.log(userBooking);

	useEffect(() => {
		dispatch(bookingActions.getBookings(User.id));
	}, [dispatch]);

	return (
		<div className="bookingsContainer">
			<style type="text/css">{`.bookingsButton {display: none}`}</style>
			<table className="bookingTable">
				<tr>
					<th>Start Date</th>
					<th>End Date</th>
				</tr>
				<tbody>
					{userBooking?.map((booking) => {
						return (
							<tr>
								<td>{booking.startDate}</td>
								<td>{booking.endDate}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

export default UserBookings;
