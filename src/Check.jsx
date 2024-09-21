import { useSelector, useDispatch } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import {
  setArrivalDate,
  setDepartureDate,
  setAdults,
  setChildren,
  setAvailableRooms,
  setErrorMessage,
  setDateErrorMessage,
  setShowClearButton,
  clearFields,
} from './actions/uiActions';

const Check = () => {
  const dispatch = useDispatch();
  const {
    arrivalDate,
    departureDate,
    adults,
    children,
    availableRooms,
    errorMessage,
    dateErrorMessage,
    showClearButton,
  } = useSelector((state) => state.ui);

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const roomTypes = [
    { name: 'Single Room', capacity: 1 },
    { name: 'Double Room', capacity: 2 },
    { name: 'Twin Room', capacity: 2 },
    { name: 'Suite', capacity: 4 },
    { name: 'Deluxe Room', capacity: 4 },
    { name: 'Executive Room', capacity: 4 },
    { name: 'Family Room', capacity: 6 },
    { name: 'Presidential Suite', capacity: 6 },
  ];

  const validateDate = (dateStr) => {
    const regex = /^([1-9]|[12][0-9]|3[01])\/([1-9]|1[0-2])\/\d{4}$/;
    return regex.test(dateStr);
  };

  const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split('/').map(Number);
    return new Date(year, month - 1, day);
  };

  const handleCheckAvailability = () => {
    dispatch(setErrorMessage(''));
    dispatch(setDateErrorMessage(''));
    dispatch(setShowClearButton(true));

    if (!arrivalDate || !departureDate || !adults || !children) {
      dispatch(setErrorMessage('All fields are required.'));
      dispatch(setAvailableRooms([]));
      return;
    }

    const totalPeople = parseInt(adults, 10) + parseInt(children, 10);

    if (!validateDate(arrivalDate) || !validateDate(departureDate)) {
      dispatch(setDateErrorMessage('Please enter dates in the format D/M/YYYY.'));
      dispatch(setAvailableRooms([]));
      return;
    }

    const arrival = parseDate(arrivalDate);
    const departure = parseDate(departureDate);

    if (arrival >= departure) {
      dispatch(setDateErrorMessage('Departure date must be after arrival date.'));
      dispatch(setAvailableRooms([]));
      return;
    }

    if (isNaN(totalPeople) || totalPeople <= 0) {
      dispatch(setErrorMessage('Please enter valid numbers for adults and children.'));
      dispatch(setAvailableRooms([]));
      return;
    }

    const roomsAvailable = roomTypes.filter(room => room.capacity >= totalPeople);
    
    if (roomsAvailable.length > 0) {
      dispatch(setAvailableRooms(roomsAvailable));
    } else {
      dispatch(setAvailableRooms([]));
      dispatch(setErrorMessage('No rooms available for the specified number of people.'));
    }
  };

  const handleClear = () => {
    dispatch(clearFields());
  };

  return (
    <div
      ref={ref}
      className={`bg-white p-6 mt-6 shadow-md rounded-lg transition-transform duration-700 ease-out ${inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
    >
      <div className="flex flex-wrap justify-center gap-4">
        <div className="flex flex-wrap gap-4 justify-center w-full max-w-4xl px-6">
          <div className="flex flex-col flex-grow">
            <input
              id="arrival-date"
              type="text"
              value={arrivalDate}
              onChange={(e) => dispatch(setArrivalDate(e.target.value))}
              placeholder="Arrival Date"
              className="border border-gray-300 rounded py-2 px-3 w-full max-w-[150px] h-[38px]"
            />
          </div>
          <div className="flex flex-col flex-grow">
            <input
              id="departure-date"
              type="text"
              value={departureDate}
              onChange={(e) => dispatch(setDepartureDate(e.target.value))}
              placeholder="Departure Date"
              className="border border-gray-300 rounded py-2 px-3 w-full max-w-[150px] h-[38px]"
            />
          </div>
          <div className="flex flex-col flex-grow">
            <input
              id="adults"
              type="number"
              value={adults}
              onChange={(e) => dispatch(setAdults(e.target.value))}
              placeholder="Adults"
              className="border border-gray-300 rounded py-2 px-3 w-full max-w-[150px] h-[38px]"
              min="1"
            />
          </div>
          <div className="flex flex-col flex-grow">
            <input
              id="children"
              type="number"
              value={children}
              onChange={(e) => dispatch(setChildren(e.target.value))}
              placeholder="Children"
              className="border border-gray-300 rounded py-2 px-3 w-full max-w-[150px] h-[38px]"
              min="0"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCheckAvailability}
              className="bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600 transition h-[38px] flex items-center justify-center font-semibold text-sm"
            >
              Check Availability
            </button>
            {showClearButton && (
              <button
                onClick={handleClear}
                className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 transition h-[38px] flex items-center justify-center font-semibold text-sm"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        <div className="mt-4 w-full max-w-4xl px-6">
          {dateErrorMessage && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <strong className="font-bold">Date Error:</strong>
              <span className="block sm:inline">{dateErrorMessage}</span>
            </div>
          )}
          {errorMessage && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <strong className="font-bold">Error:</strong>
              <span className="block sm:inline">{errorMessage}</span>
            </div>
          )}
          {availableRooms.length > 0 && !errorMessage && !dateErrorMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
              <h3 className="text-lg font-semibold mb-2">Available Rooms:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {availableRooms.map((room, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-md p-4">
                    <h4 className="text-xl font-semibold text-teal-600">{room.name}</h4>
                    <p className="text-gray-600 mt-2">Capacity: {room.capacity} people</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Check;