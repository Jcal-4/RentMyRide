import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as bookingActions from "../../store/bookings";

function UserBookings() {
	const dispatch = useDispatch();
	const User = useSelector((state) => state.session.user);
	useEffect(() => {
		dispatch(bookingActions.getBookings(User.id));
	}, [dispatch]);

	return (
		<div>
			<style type="text/css">{`.bookingsButton {display: none}`}</style>
		</div>
	);
}

export default UserBookings;
