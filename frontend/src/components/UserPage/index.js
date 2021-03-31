import React, { useState, useEffect } from "react";
import * as userActions from "../../store/user";

import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

function UserPage() {
	const dispatch = useDispatch();

	const { userId } = useParams();
	const user = useSelector((state) => state.session.user);
	// console.log(userId);

	useEffect(() => {
		dispatch(userActions.getUser(userId));
	}, [dispatch]);

	let sessionUser = (
		<div>
			<div>
				{user.firstName}, {user.lastName}
			</div>
			<div>
				{user.city}, {user.state}
			</div>
		</div>
	);
	return <div>{sessionUser}</div>;
}

export default UserPage;
