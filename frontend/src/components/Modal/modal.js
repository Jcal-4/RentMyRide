import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactDOM from "react-dom";

import {hideModal} from '../../store/modal'

import "./modal.css";

function Modal() {
  const dispatch = useDispatch();
  const mount = useSelector((state) => state.modal.mount);
  const display = useSelector((state) => state.modal.display);
  // Any react component can be passed onto this
  const Current = useSelector((state) => state.modal.current);

  const onClose = () => {
    dispatch(hideModal())
  }

  return (
    mount &&
    display &&
    ReactDOM.createPortal(
      <div onClick={onClose} className="modal-background">
     
        <div onClick={(e) => e.stopPropagation()} className="modal-content" id="modal-content">
          <Current />
        </div>
      </div>,
      mount
    )
  );
}

export default Modal;
