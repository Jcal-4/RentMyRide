import React, { useEffect } from "react";
import * as userActions from "../../store/user";
import "./UserPage.css";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

function UserPage() {
	const dispatch = useDispatch();
	const { userId } = useParams();
	const user = useSelector((state) => state.user.userInfo);
	console.log(user);

	useEffect(() => {
		dispatch(userActions.getUser(userId));
	}, [dispatch, userId]);

	let sessionUser = (
		<div className="profileContainer">
			<div>
				{user.firstName} {user.lastName}
			</div>
			<div>
				{user.city}, {user.state}
			</div>
			<img className="userProfilePic" alt="" src={user.profileImageUrl}></img>
		</div>
	);
	return (
		<div>
			<style type="text/css">{`.profileButton {display: none}`}</style>
			{sessionUser}
		</div>
	);
}

export default UserPage;
