import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as bookingActions from "../../store/bookings";
import "./UserBookings.css";

function UserBookings() {
  const dispatch = useDispatch();
  const User = useSelector((state) => state.session.user);
  const userBooking = useSelector(
    (state) => state.booking.bookingInfo.Bookings
  );

  useEffect(() => {
    dispatch(bookingActions.getBookings(User.id));
  }, [dispatch, User]);

  return (
    <div className="bookings">
      <style type="text/css">{`.bookingsButton {display: none}`}</style>
      <h1 className="bookings_header">Bookings</h1>

      <div className="bookingsContainer">
        {userBooking?.map((booking) => {
          return (
            <NavLink to={`/car/${booking.Car.id}`}>
              <div className="booking_holder">
                <div className="rented_name">
                  <p>
                    {booking.Car.carMake} {booking.Car.carModel}
                  </p>
                </div>
                <div className="someName">
                  <img
                    className="booked_car"
                    src={booking.Car.carImage}
                    alt=""
                  ></img>
                </div>
                <div className="dates">
                  <p className="start_date">Start: {booking.startDate}</p>
                  <p className="end_date">End: {booking.endDate}</p>
                </div>
              </div>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

export default UserBookings;
