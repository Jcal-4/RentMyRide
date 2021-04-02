import { csrfFetch } from "./csrf";

const BOOKING = "user/LOAD/BOOKINGS";
const CREATE_BOOKING = "user/create/booking";
// ACTIONS ***********************************************************************************************
const loadUser = (user) => ({
	type: BOOKING,
	user,
});

const createBooking = (booking) => ({
	type: CREATE_BOOKING,
	booking,
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

// Create a booking
export const createBookings = (booking) => async (dispatch) => {
	console.log(booking);
	const response = await csrfFetch(`/api/booking/bookCar`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(booking),
	});
	const data = await response.json();

	dispatch(createBooking(data));
	return response;
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
		case CREATE_BOOKING:
			let newState = Object.assign({}, state);
			newState.booking = action.booking;
			return newState;
		default:
			return state;
	}
};

export default bookingReducer;
