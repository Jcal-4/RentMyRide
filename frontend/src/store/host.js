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
// adds a car to database
export const createCar = (car) => async (dispatch) => {
	const response = await csrfFetch(`/api/user/host`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(car),
	});
	const data = await response.json();

	dispatch(setCar(data.car));
	return response;
};

// Remove a car from database
export const removeCar = (carId) => async (dispatch) => {
	const response = await csrfFetch(`/api/car/${carId}`, {
		method: "DELETE",
	});
	dispatch(remove());
	return response;
};

const initialState = {
	car: null,
};

// REDUCER
const hostReducer = (state = initialState, action) => {
	let newState;
	switch (action.type) {
		case HOST:
			newState = Object.assign({}, state);
			newState.car = action.payload;
			return newState;
		case REMOVE_CAR:
			newState = Object.assign({}, state);
			newState.car = null;
			return newState;
		default:
			return state;
	}
};

export default hostReducer;
