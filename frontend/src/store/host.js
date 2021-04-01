import { csrfFetch } from "./csrf";

const HOST = "car/setCar";
const REMOVE_CAR = "car/removeCar";

// ACTIONS
const setCar = (car) => {
	return {
		type: HOST,
		payload: car,
	};
};

const remove = () => {
	return {
		type: REMOVE_CAR,
	};
};

// THUNKS
export const removeCar = (carId) => async (dispatch) => {
	const response = await csrfFetch(`/api/car/:${carId}`, {
		method: "DELETE",
	});
	dispatch(remove());
	return response;
};

export const updateCar = (car) => async (dispatch) => {
	const response = await csrfFetch(`/api/car/${car.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(car),
	});
	const data = await response.json();
	dispatch(setCar(data));
	return response;
};

export const createCar = (car) => async (dispatch) => {
	// const {
	// 	carMake,
	// 	carModel,
	// 	carYear,
	// 	pricePerDay,
	// 	carImage,
	// 	countryName,
	// 	seats,
	// 	electric,
	// 	autonomous,
	// 	roadsideAssistance,
	// 	cityName,
	// 	stateName,
	// 	address,
	// } = car;

	const response = await csrfFetch(`/api/user/host`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(car),
	});
	const data = await response.json();

	dispatch(setCar(data.spot));
	return response;
};
const hostReducer = (state = { spot: null }, action) => {
	let newState;
	switch (action.type) {
		case HOST:
			newState = Object.assign({}, state);
			newState.spot = action.payload;
			return newState;
		case REMOVE_CAR:
			newState = Object.assign({}, state);
			newState.spot = null;
			return newState;
		default:
			return state;
	}
};
export default hostReducer;
