// uiActions.js
export const TOGGLE_MOBILE_MENU = 'TOGGLE_MOBILE_MENU';
export const TOGGLE_RESERVE = 'TOGGLE_RESERVE';
export const SET_ARRIVAL_DATE = 'SET_ARRIVAL_DATE';
export const SET_DEPARTURE_DATE = 'SET_DEPARTURE_DATE';
export const SET_ADULTS = 'SET_ADULTS';
export const SET_CHILDREN = 'SET_CHILDREN';
export const SET_AVAILABLE_ROOMS = 'SET_AVAILABLE_ROOMS';
export const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';
export const SET_DATE_ERROR_MESSAGE = 'SET_DATE_ERROR_MESSAGE';
export const SET_SHOW_CLEAR_BUTTON = 'SET_SHOW_CLEAR_BUTTON';
export const CLEAR_FIELDS = 'CLEAR_FIELDS';

export const toggleMobileMenu = () => ({
  type: TOGGLE_MOBILE_MENU,
});

export const toggleReserve = () => ({
  type: TOGGLE_RESERVE,
});

export const setArrivalDate = (date) => ({ type: SET_ARRIVAL_DATE, payload: date });
export const setDepartureDate = (date) => ({ type: SET_DEPARTURE_DATE, payload: date });
export const setAdults = (number) => ({ type: SET_ADULTS, payload: number });
export const setChildren = (number) => ({ type: SET_CHILDREN, payload: number });
export const setAvailableRooms = (rooms) => ({ type: SET_AVAILABLE_ROOMS, payload: rooms });
export const setErrorMessage = (message) => ({ type: SET_ERROR_MESSAGE, payload: message });
export const setDateErrorMessage = (message) => ({ type: SET_DATE_ERROR_MESSAGE, payload: message });
export const setShowClearButton = (value) => ({ type: SET_SHOW_CLEAR_BUTTON, payload: value });
export const clearFields = () => ({ type: CLEAR_FIELDS });