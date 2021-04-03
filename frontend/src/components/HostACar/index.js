import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as hostActions from "../../store/host";

function HostForm() {
	let history = useHistory();
	const dispatch = useDispatch();
	let sessionUser = useSelector((state) => state.session.user); // current session user
	const [carMake, setCarMake] = useState("");
	const [carModel, setSpotDetails] = useState("");
	const [carYear, setCarYear] = useState("");
	const [pricePerDay, setPricePerDay] = useState("");
	const [carImage, setCarImage] = useState("");
	const [countryName, setCountryName] = useState("");
	const [seats, setSeats] = useState("");
	const [electric, setElectric] = useState("");
	const [autonomous, setAutonomous] = useState("");
	const [roadsideAssistance, setRoadsideAssistance] = useState("");
	const [cityName, setCityName] = useState("");
	const [stateName, setStateName] = useState("");
	const [address, setAddress] = useState("");

	const onSubmit = (e) => {
		e.preventDefault();
		let userId = sessionUser;

		return dispatch(
			hostActions.createCar({
				userId,
				carMake,
				carModel,
				carYear,
				pricePerDay,
				carImage,
				countryName,
				seats,
				electric,
				autonomous,
				roadsideAssistance,
				cityName,
				stateName,
				address,
			})
		);
	};

	if (!sessionUser) {
		history.push("/login");
	}

	return (
		<form onSubmit={onSubmit}>
			<div>
				<div>
					<label>Make</label>
				</div>
				<input
					type="text"
					value={carMake}
					onChange={(e) => setCarMake(e.target.value)}
					required
				/>
			</div>
			<div>
				<div>
					<label>Model</label>
				</div>
				<input
					value={carModel}
					onChange={(e) => setSpotDetails(e.target.value)}
					required
				></input>
			</div>
			<div>
				<div>
					<label>Year</label>
				</div>
				<input
					type="number"
					value={carYear}
					onChange={(e) => setCarYear(e.target.value)}
					required
				></input>
			</div>
			<div>
				<div>
					<label>Seats</label>
				</div>
				<input
					type="number"
					value={seats}
					onChange={(e) => setSeats(e.target.value)}
				></input>
			</div>
			<div>
				<div>
					<label>Electric</label>
				</div>
				<select value={electric} onChange={(e) => setElectric(e.target.value)}>
					<option value="Yes">Yes</option>
					<option value="No">No</option>
					<option value="Hybrid">Hybrid</option>
				</select>
			</div>
			<div>
				<div>
					<label>Autonomous</label>
				</div>
				<select
					value={autonomous}
					onChange={(e) => setAutonomous(e.target.value)}
				>
					<option value="Yes">Yes</option>
					<option value="No">No</option>
				</select>
			</div>
			<div>
				<div>
					<label>Roadside Assistant</label>
				</div>
				<select
					value={roadsideAssistance}
					onChange={(e) => setRoadsideAssistance(e.target.value)}
				>
					<option value="Yes">Yes</option>
					<option value="No">No</option>
				</select>
			</div>
			<div>
				<div>
					<label>Price Per Day</label>
				</div>
				<input
					type="number"
					value={pricePerDay}
					onChange={(e) => setPricePerDay(e.target.value)}
					required
				></input>
			</div>
			<div>
				<div>
					<label>Image URL</label>
				</div>
				<input
					type="text"
					value={carImage}
					onChange={(e) => setCarImage(e.target.value)}
					required
				></input>
			</div>
			<div>
				<div>
					<label>Address</label>
				</div>
				<input
					type="text"
					value={address}
					onChange={(e) => setAddress(e.target.value)}
					required
				/>
			</div>
			<div>
				<div>
					<label>City</label>
				</div>
				<input
					type="text"
					value={cityName}
					onChange={(e) => setCityName(e.target.value)}
					required
				/>
			</div>
			<div>
				<div>
					<label>State</label>
				</div>
				<select
					value={stateName}
					onChange={(e) => setStateName(e.target.value)}
				>
					<option value="">-- UNITED STATES --</option>
					<option value="Alabama">Alabama</option>
					<option value="Alaska">Alaska</option>
					<option value="Arizona">Arizona</option>
					<option value="Arkansas">Arkansas</option>
					<option value="California">California</option>
					<option value="Colorado">Colorado</option>
					<option value="Connecticut">Connecticut</option>
					<option value="Delaware">Delaware</option>
					<option value="Florida">Florida</option>
					<option value="Georgia">Georgia</option>
					<option value="Hawaii">Hawaii</option>
					<option value="Idaho">Idaho</option>
					<option value="Illinois">Illinois</option>
					<option value="Indiana">Indiana</option>
					<option value="Iowa">Iowa</option>
					<option value="Kansas">Kansas</option>
					<option value="Kentucky">Kentucky</option>
					<option value="Louisiana">Louisiana</option>
					<option value="Maine">Maine</option>
					<option value="Maryland">Maryland</option>
					<option value="Massachusetts">Massachusetts</option>
					<option value="Michigan">Michigan</option>
					<option value="Minnesota">Minnesota</option>
					<option value="Mississippi">Mississippi</option>
					<option value="Missouri">Missouri</option>
					<option value="Montana">Montana</option>
					<option value="Nebraska">Nebraska</option>
					<option value="Nevada">Nevada</option>
					<option value="New Hampshire">New Hampshire</option>
					<option value="New Jersey">New Jersey</option>
					<option value="New Mexico">New Mexico</option>
					<option value="New York">New York</option>
					<option value="North Carolina">North Carolina</option>
					<option value="North Dakota">North Dakota</option>
					<option value="Ohio">Ohio</option>
					<option value="Oklahoma">Oklahoma</option>
					<option value="Oregon">Oregon</option>
					<option value="Pennsylvania">Pennsylvania</option>
					<option value="Rhode Island">Rhode Island</option>
					<option value="South Carolina">South Carolina</option>
					<option value="South Dakota">South Dakota</option>
					<option value="Tennessee">Tennessee</option>
					<option value="Texas">Texas</option>
					<option value="Utah">Utah</option>
					<option value="Vermont">Vermont</option>
					<option value="Virginia">Virginia</option>
					<option value="Washington">Washington</option>
					<option value="West Virginia">West Virginia</option>
					<option value="Wisconsin">Wisconsin</option>
					<option value="Wyoming">Wyoming</option>
					<option value="">-- CANADA --</option>
					<option value="Alberta">Alberta</option>
					<option value="British Columbia">British Columbia</option>
					<option value="Manitoba">Manitoba</option>
					<option value="New Brunswick">New Brunswick</option>
					<option value="Newfoundland and Labrador">
						Newfoundland and Labrador
					</option>
					<option value="Northwest Territories">Northwest Territories</option>
					<option value="Nova Scotia">Nova Scotia</option>
					<option value="Nunavut">Nunavut</option>
					<option value="Ontario">Ontario</option>
					<option value="Prince Edward Island">Prince Edward Island</option>
					<option value="Quebec">Quebec</option>
					<option value="Saskatchewan">Saskatchewan</option>
					<option value="Yukon Territory">Yukon Territory</option>
				</select>
			</div>
			<div>
				<div>
					<label>Country</label>
				</div>
				<input
					type="text"
					value={countryName}
					onChange={(e) => setCountryName(e.target.value)}
					required
				/>
			</div>
			<div>
				<button type="submit">Sign Up</button>
			</div>
		</form>
	);
}
export default HostForm;
