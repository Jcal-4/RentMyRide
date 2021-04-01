import { csrfFetch } from "./csrf";

const BOOKING = "user/LOAD/BOOKINGS";

// ACTIONS ***********************************************************************************************
const loadUser = (user) => ({
	type: BOOKING,
	user,
});

// THUNKS ************************************************************************************************
// Grab a users bookings
export const getBookings = (userId) => async (dispatch) => {
	const response = await csrfFetch(`/api/booking/${userId}`);

	if (response.ok) {
		const user = await response.json();
		dispatch(loadUser(user));
	}
};

// REDUCER ************************************************************************************************
const initialState = {
	bookingInfo: [],
};

const bookingReducer = (state = initialState, action) => {
	switch (action.type) {
		case BOOKING: {
			const newState = {
				...state, // grabbing everything in the sate including users..
				bookingInfo: action.user,
			};
			return newState;
		}
		default:
			return state;
	}
};

export default bookingReducer;
