import { csrfFetch } from "./csrf";

const CARS = "car/LOCATIONS";

// ACTIONS----------------------------------------------------------------
const loadCars = (cars) => ({
	type: CARS,
	cars,
});

// THUNK------------------------------------------------------------------
// Grab all the cars that are within the city
export const getCars = (carLocation) => async (dispatch) => {
	const response = await csrfFetch(`/api/car/locations`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(carLocation),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(loadCars(data));
		return response;
	}
};

const initialState = {
	carLocations: null, // will be filled with all the cars in the location
};

// REDUCER-----------------------------------------------------------------
const grabCarsReducer = (state = initialState, action) => {
	let newState;
	switch (action.type) {
		case CARS:
			newState = Object.assign({}, state);
			newState.carLocations = action.cars;
			return newState;
		default:
			return state;
	}
};
export default grabCarsReducer;
