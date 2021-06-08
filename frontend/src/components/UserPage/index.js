import React, { useEffect } from "react";
import * as userActions from "../../store/user";
import "./UserPage.css";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

function UserPage() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const user = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    dispatch(userActions.getUser(userId));
  }, [dispatch, userId]);

  return (
    <div className="profile_holder">
      <style type="text/css">{`.profileButton {display: none}`}</style>
      <div className="profileContainer">
        <div>
          {user.firstName} {user.lastName}
        </div>
        <div>
          {user.city}, {user.state}
        </div>
        <img className="userProfilePic" alt="" src={user.profileImageUrl}></img>
      </div>
      <div className="user_cars"></div>
    </div>
  );
}

export default UserPage;
