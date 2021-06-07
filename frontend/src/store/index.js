import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import carReducer from "./car";
import userReducer from "./user";
import bookingReducer from "./bookings";
import reviewReducer from "./review";
import grabCarsReducer from "./carlocation";
import modal from "./modal";
import individualCar from "./IndividualCar";

const rootReducer = combineReducers({
  session: sessionReducer,
  car: carReducer,
  user: userReducer,
  booking: bookingReducer,
  review: reviewReducer,
  carlocation: grabCarsReducer,
  modal,
  individualCar,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
