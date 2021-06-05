import { csrfFetch } from "./csrf";

const REVIEW = "review/POST";
const GETREVIEW = "review/GET";

// ACTIONS
const addReview = (review) => {
  return {
    type: REVIEW,
    payload: review,
  };
};

const allReviews = (reviews) => {
  return {
    type: GETREVIEW,
    payload: reviews,
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
  dispatch(addReview(data));
  return response;
};
// Grab all reviews pertaining to a Car
export const getReviews = (carId) => async (dispatch) => {
  const response = await csrfFetch(`/api/review/car/${carId}`);
  if (response.ok) {
    const reviews = await response.json();
    dispatch(allReviews(reviews));
  }
};

// REDUCER
const reviewReducer = (state = { review: [] }, action) => {
  let newState;
  switch (action.type) {
    case REVIEW:
      newState = Object.assign({}, state);
      const carReviews = Object.values(newState); // .push(action.payload)
      carReviews.push(action.payload); // will push the new reviews into here
      newState[0] = carReviews;
      let newArr = [];
      newArr.push(newState[0]);
      return newArr[0];
    case GETREVIEW:
      return action.payload;
    default:
      return state;
  }
};
export default reviewReducer;
