import { csrfFetch } from "./csrf";

const USER = "user/LOAD";

// ACTIONS ***********************************************************************************************
const loadUser = (user) => ({
	type: USER,
	user,
});

// THUNKS ************************************************************************************************
// Grab a user thunk
export const getUser = (userId) => async (dispatch) => {
	const response = await csrfFetch(`/api/user/${userId}`);

	if (response.ok) {
		const user = await response.json();
		dispatch(loadUser(user));
	}
};

// REDUCER ************************************************************************************************
const initialState = {
	userInfo: {},
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case USER: {
			const newState = {
				...state, // grabbing everything in the sate including users..
				userInfo: action.user,
			};
			return newState;
		}
		default:
			return state;
	}
};

// this will grab all of the database cars and then give us access to them in the component

// const carReducer = (state = initialState, action) => {
// 	switch (action.type) {
// 		case USER: {
// 			const allCars = {};
// 			action.cars.forEach((car) => {
// 				allCars[car.id] = car;
// 			});
// 			return {
// 				...allCars,
// 				...state,
// 			};
// 		}
// 		default:
// 			return state;
// 	}
// };

export default userReducer;
