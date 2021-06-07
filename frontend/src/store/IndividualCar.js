import { csrfFetch } from "./csrf";

const CAR = "car/LOADING_CAR";

// ACTIONS ***********************************************************************************************
const loadCar = (car) => ({
  type: CAR,
  payload: car,
});

// THUNKS ************************************************************************************************
// Grab all car thunk
export const getCar = (carId) => async (dispatch) => {
  const response = await csrfFetch(`/api/car/${carId}`);

  if (response.ok) {
    const car = await response.json();
    console.log(car, "*********************");
    dispatch(loadCar(car));
  }
};

// REDUCER ************************************************************************************************

// this will grab all of the database car and then give us access to them in the component

const car = (state = {}, action) => {
  switch (action.type) {
    case CAR: {
      return action.payload;
    }
    default:
      return state;
  }
};

export default car;
