import React, { useEffect } from "react";
import * as userActions from "../../store/user";
import "./UserPage.css";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";

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
        <div>
          <p>About: {user.about}</p>
        </div>
      </div>
      <div className="user_cars_holder">
        <div className="profile_header">
          <h1>My Cars</h1>
        </div>
        <div className="user_cars">
          {user.Cars && (
            <div className="user_cars">
              {user.Cars.length > 0 &&
                user.Cars.map((car) => (
                  <NavLink className="links" to={`/car/${car.id}`}>
                    <div className="cardsContainer">
                      <img
                        className="carDisplay__homePage"
                        alt=""
                        src={car.carImage}
                      ></img>
                      <li className="model_car" key={car.id}>
                        {car.carModel}
                      </li>
                    </div>
                  </NavLink>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserPage;
