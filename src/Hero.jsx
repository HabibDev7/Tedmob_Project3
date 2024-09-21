import { useDispatch } from 'react-redux';
import { toggleReserve } from './actions/uiActions';

const Hero = () => {
  const dispatch = useDispatch();

  const handleBookNow = () => {
    dispatch(toggleReserve());
  };

  return (
    <div id="hero" className="flex justify-start items-center p-6 min-h-screen bg-transparent relative z-10">
      <div className="max-w-[500px] p-6">
        <h1 className="text-4xl font-bold text-white mb-4">
          Spend quality time with us
        </h1>
        <p className="text-white text-sm mb-6">
          Enjoy exceptional service, luxurious rooms, and exquisite dining options. Whether you’re here for a romantic getaway or a family vacation, we provide the perfect setting for relaxation and enjoyment.
        </p>
        <button
          onClick={handleBookNow}
          className="bg-transparent text-white border border-white py-2 px-4 rounded transform transition-transform duration-300 hover:scale-110"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default Hero;