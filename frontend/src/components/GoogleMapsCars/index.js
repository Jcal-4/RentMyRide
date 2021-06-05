import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import "./GoogleMapsCars.css";

function GoogleMapCars() {
  const cars = useSelector((state) => state.carlocation.carLocations);

  let sessionLinks = (
    <ul className="carLinks__maps">
      {cars?.map((car) => (
        <NavLink className="links" to={`/car/${car.id}`}>
          <div className="cardsContainer__mapPage">
            <img
              className="carDisplay__mapsPage"
              alt=""
              src={car.carImage}
            ></img>
            <div className="carmap_info">
              <div className="car_map_info">
                <div>
                  <p key={car.id}>
                    {car.carMake}, {car.carModel}
                  </p>
                </div>
                <div>
                  <p>State: {car.stateName}</p>
                </div>
                <div>
                  <p>City: {car.cityName}</p>
                </div>
                <div>
                  <p>Price: ${car.pricePerDay}</p>
                </div>
              </div>
            </div>
          </div>
        </NavLink>
      ))}
    </ul>
  );

  return <div className="carScroll">{sessionLinks}</div>;
}

export default GoogleMapCars;
