import { csrfFetch } from "./csrf";

const CARS = "car/LOAD";

// ACTIONS ***********************************************************************************************
const loadCars = (cars) => ({
	type: CARS,
	cars,
});

// THUNKS ************************************************************************************************
// Grab all cars thunk
export const getCars = () => async (dispatch) => {
	const response = await csrfFetch("/api/car");

	if (response.ok) {
		const cars = await response.json();
		dispatch(loadCars(cars));
	}
};

// REDUCER ************************************************************************************************
const initialState = {
	carsList: [],
};

// this will grab all of the database cars and then give us access to them in the component

const carReducer = (state = initialState, action) => {
	switch (action.type) {
		case CARS: {
			const allCars = {};
			action.cars.forEach((car) => {
				allCars[car.id] = car;
			});
			return {
				...allCars,
				...state,
				carsList: action.cars,
			};
		}
		default:
			return state;
	}
};

export default carReducer;
