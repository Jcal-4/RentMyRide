const SHOW = "modal/show";

const HIDE = "modal/hide";

const CURRENT = "modal/current";

const MOUNT = "modal/mount";

export const showModal = () => ({
  type: SHOW,
});
export const hideModal = () => ({
  type: HIDE,
});
export const setCurrentModal = (current) => ({
  type: CURRENT,
  current
});
export const setModalMount = (mount) => ({
  type: MOUNT,
  mount
});

export default function reducer(
  state = { current: null, mount: null, display: false },
  action
) {
  switch (action.type) {
    case SHOW:
      return { ...state, display: true };
    case HIDE:
      return { ...state, display: false };
    case CURRENT:
      return { ...state, current: action.current };
    case MOUNT:
      return { ...state, mount: action.mount };
    default:
      return state;
  }
}
