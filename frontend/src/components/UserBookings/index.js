import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as bookingActions from "../../store/bookings";

function UserBookings() {
	const dispatch = useDispatch();
	const User = useSelector((state) => state.session.user);
	const userBooking = useSelector(
		(state) => state.booking.bookingInfo.Bookings
	);

	useEffect(() => {
		dispatch(bookingActions.getBookings(User.id));
	}, [dispatch]);

	return (
		<div>
			<style type="text/css">{`.bookingsButton {display: none}`}</style>
			<div>
				{userBooking?.map((booking) => {
					return (
						<div>
							Start Date: {booking.startDate}, End Date: {booking.endDate}
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default UserBookings;
