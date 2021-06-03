import React, { useRef, useEffect } from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider, useDispatch } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import { restoreCSRF, csrfFetch } from "./store/csrf";
import * as sessionActions from './store/session'
import { setModalMount } from "./store/modal";

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
	restoreCSRF();

	window.csrfFetch = csrfFetch;
	window.store = store;
	window.sessionActions = sessionActions;
}

if (process.env.NODE_ENV !== "production") {
  window.store = store;
}

function Root() {
  const modalMooringRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setModalMount(modalMooringRef.current));
  }, [dispatch]);

  return (
      <BrowserRouter>
        <App />
        <div ref={modalMooringRef} className="modal" />
      </BrowserRouter>
  );
}

ReactDOM.render(
  <React.StrictMode>
  <ReduxProvider store={store}>
    <Root />
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
