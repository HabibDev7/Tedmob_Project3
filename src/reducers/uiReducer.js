import {
  TOGGLE_MOBILE_MENU,
  TOGGLE_RESERVE,
  SET_ARRIVAL_DATE,
  SET_DEPARTURE_DATE,
  SET_ADULTS,
  SET_CHILDREN,
  SET_AVAILABLE_ROOMS,
  SET_ERROR_MESSAGE,
  SET_DATE_ERROR_MESSAGE,
  SET_SHOW_CLEAR_BUTTON,
  CLEAR_FIELDS,
} from '../actions/uiActions';

const initialState = {
  arrivalDate: '',
  departureDate: '',
  adults: '',
  children: '',
  availableRooms: [],
  errorMessage: '',
  dateErrorMessage: '',
  showClearButton: false,
  mobileMenuOpen: false,
  showReserveForm: false,
  checkOpen: false,
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ARRIVAL_DATE:
      return { ...state, arrivalDate: action.payload };
    case SET_DEPARTURE_DATE:
      return { ...state, departureDate: action.payload };
    case SET_ADULTS:
      return { ...state, adults: action.payload };
    case SET_CHILDREN:
      return { ...state, children: action.payload };
    case SET_AVAILABLE_ROOMS:
      return { ...state, availableRooms: action.payload };
    case SET_ERROR_MESSAGE:
      return { ...state, errorMessage: action.payload };
    case SET_DATE_ERROR_MESSAGE:
      return { ...state, dateErrorMessage: action.payload };
    case SET_SHOW_CLEAR_BUTTON:
      return { ...state, showClearButton: action.payload };
    case CLEAR_FIELDS:
      return { ...initialState };
    case TOGGLE_MOBILE_MENU:
      return {
        ...state,
        mobileMenuOpen: !state.mobileMenuOpen,
      };
    case TOGGLE_RESERVE:
      return {
        ...state,
        showReserveForm: !state.showReserveForm,
      };
    default:
      return state;
  }
};

export default uiReducer;