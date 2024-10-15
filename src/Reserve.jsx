import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleReserve } from './actions/uiActions';
import axios from 'axios';

const Reserve = () => {
  const dispatch = useDispatch();
  const isVisible = useSelector((state) => state.ui.showReserveForm);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [roomType, setRoomType] = useState('');
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [errors, setErrors] = useState({});
  const [price, setPrice] = useState(null);
  const [setConfirmationMessage] = useState('');
  const [showThankYou, setShowThankYou] = useState(false);

  const validate = () => {
    const newErrors = {};
  
    if (!firstName) newErrors.firstName = 'First name is required.';
    else if (/\d/.test(firstName)) newErrors.firstName = 'First name cannot contain numbers.';
  
    if (!lastName) newErrors.lastName = 'Last name is required.';
    else if (/\d/.test(lastName)) newErrors.lastName = 'Last name cannot contain numbers.';
  
    if (!dob) newErrors.dob = 'Date of birth is required.';
  
    if (!email) newErrors.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email format is invalid.';
  
    if (!phone) newErrors.phone = 'Phone number is required.';
    else if (!/^\+?\d{10,15}$/.test(phone)) newErrors.phone = 'Phone number must include country code and contain only digits.';
  
    if (!arrivalDate) newErrors.arrivalDate = 'Arrival date is required.';
    if (!departureDate) newErrors.departureDate = 'Departure date is required.';
    else if (new Date(arrivalDate) >= new Date(departureDate)) newErrors.departureDate = 'Departure date must be after arrival date.';
  
    if (!roomType) newErrors.roomType = 'Room type is required.';
  
    const totalGuests = parseInt(adults) + parseInt(children);
    if (totalGuests > 6) newErrors.guests = 'The total number of adults and children cannot exceed 6.';
    if (totalGuests < 1) newErrors.guests = 'At least one guest is required.';
  
    const roomCapacities = {
      single: 1,
      double: 2,
      twin: 2,
      suite: 4,
      deluxe: 4,
      executive: 4,
      family: 6,
      presidential: 6
    };
  
    if (roomType && (adults > roomCapacities[roomType] || children > roomCapacities[roomType] - adults)) {
      newErrors.roomType = `The selected room type (${roomType.charAt(0).toUpperCase() + roomType.slice(1)}) cannot accommodate more than ${roomCapacities[roomType]} guests.`;
    }
  
    return newErrors;
  };

  const calculatePrice = () => {
    const roomRates = {
      single: 100,
      double: 150,
      twin: 120,
      suite: 250,
      deluxe: 200,
      executive: 180,
      family: 220,
      presidential: 500
    };

    const arrival = new Date(arrivalDate);
    const departure = new Date(departureDate);
    const nights = Math.floor((departure - arrival) / (1000 * 60 * 60 * 24));

    if (roomType && nights > 0) {
      const baseRate = roomRates[roomType];
      const totalPrice = baseRate * nights;
      setPrice(totalPrice);
    } else {
      setPrice(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      calculatePrice();
    } else {
      setErrors(validationErrors);
    }
  };

  const handleConfirm = async () => {
    const bookingData = {
      firstName,
      lastName,
      dob,
      email,
      phone,
      arrivalDate,
      departureDate,
      roomType,
      adults,
      children,
      price,
    };
  
    try {
      const response = await axios.post('http://localhost:5000/api/reservations', bookingData);
      if (response.status === 201) {
        // Booking successful
        setShowThankYou(true);
      } else {
        // Handle unexpected responses
        console.error('Unexpected response:', response);
      }
    } catch (error) {
      // Handle errors from the API
      console.error('Error creating booking:', error);
      alert('There was an error processing your booking. Please try again later.');
    }
  };  

  const handleClear = () => {
    setFirstName('');
    setLastName('');
    setDob('');
    setEmail('');
    setPhone('');
    setArrivalDate('');
    setDepartureDate('');
    setRoomType('');
    setAdults(0);
    setChildren(0);
    setErrors({});
    setPrice(null);
    setConfirmationMessage('');
  };

  if (!isVisible) return null;

  return (
    <>
      <div className={`bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl mx-auto mt-10 relative ${showThankYou ? 'opacity-0 invisible' : 'opacity-100 visible'}`}>
        <button
          onClick={() => dispatch(toggleReserve())}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-3xl font-bold transition-transform transform hover:scale-110 focus:outline-none"
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-4xl font-extrabold mb-6 text-center text-gray-900">Reserve Your Stay</h2>
        <p className="mb-6 text-gray-600 text-center text-lg">Fill out the form below to reserve your stay with us!</p>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col space-y-6">
            <label className="block text-gray-700 font-semibold mb-2">
              First Name:
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
              />
              {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
            </label>
            <label className="block text-gray-700 font-semibold mb-2">
              Last Name:
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
              />
              {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
            </label>
            <label className="block text-gray-700 font-semibold mb-2">
              Date of Birth:
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
              />
              {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
            </label>
            <label className="block text-gray-700 font-semibold mb-2">
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </label>
            <label className="block text-gray-700 font-semibold mb-2">
              Phone:
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            </label>
          </div>
          <div className="flex flex-col space-y-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Arrival Date:
              <input
                type="date"
                value={arrivalDate}
                onChange={(e) => setArrivalDate(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
              />
              {errors.arrivalDate && <p className="text-red-500 text-sm">{errors.arrivalDate}</p>}
            </label>
            <label className="block text-gray-700 font-semibold mb-2">
              Departure Date:
              <input
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
              />
              {errors.departureDate && <p className="text-red-500 text-sm">{errors.departureDate}</p>}
            </label>
            <label className="block text-gray-700 font-semibold mb-2">
              Room Type:
              <select
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
              >
                <option value="">Select a room type</option>
                <option value="single">Single</option>
                <option value="double">Double</option>
                <option value="twin">Twin</option>
                <option value="suite">Suite</option>
                <option value="deluxe">Deluxe</option>
                <option value="executive">Executive</option>
                <option value="family">Family</option>
                <option value="presidential">Presidential</option>
              </select>
              {errors.roomType && <p className="text-red-500 text-sm">{errors.roomType}</p>}
            </label>
            <label className="block text-gray-700 font-semibold mb-2">
              Adults:
              <input
                type="number"
                value={adults}
                onChange={(e) => setAdults(parseInt(e.target.value) || 0)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
                min="0"
              />
            </label>
            <label className="block text-gray-700 font-semibold mb-2">
              Children:
              <input
                type="number"
                value={children}
                onChange={(e) => setChildren(parseInt(e.target.value) || 0)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
                min="0"
              />
            </label>
            {errors.guests && <p className="text-red-500 text-sm">{errors.roomType}</p>}
          </div>
          <div className="col-span-2 mt-6 flex justify-center gap-4">
            <button
              type="submit"
              className="px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
            >
              Check Price
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
            >
              Clear Form
            </button>
          </div>
        </form>
        {price !== null && (
          <div className="mt-6 text-center">
            <p className="text-lg font-semibold text-gray-900">Total Price: ${price}</p>
            <button
              onClick={handleConfirm}
              className="mt-4 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
            >
              Confirm Reservation
            </button>
          </div>
        )}
      </div>

      {showThankYou && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full transform scale-100 transition-transform duration-300 ease-in-out">
            <h2 className="text-2xl font-bold mb-4 text-center">Thank You!</h2>
            <p className="mb-6 text-gray-700 text-center">Your reservation has been confirmed. We look forward to your stay!</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => dispatch(toggleReserve())}
                className="px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
              >
                Continue Browsing
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Reserve;