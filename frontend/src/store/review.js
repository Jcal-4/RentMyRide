import { csrfFetch } from "./csrf";

const REVIEW = "review/POST";

// ACTIONS
const addReview = (review) => {
	return {
		type: REVIEW,
		payload: review,
	};
};

// THUNKS
// Adds a review to the database
export const postReview = (review) => async (dispatch) => {
	const response = await csrfFetch(`/api/review`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(review),
	});
	const data = await response.json();

	dispatch(addReview(data.review));
	return response;
};

const initialState = {
	review: [],
};

// REDUCER
const reviewReducer = (state = initialState, action) => {
	let newState;
	switch (action.type) {
		case REVIEW:
			newState = Object.assign({}, state);
			newState.car = action.payload;
			return newState;
		default:
			return state;
	}
};
export default reviewReducer;
