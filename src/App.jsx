import { useSelector, useDispatch } from 'react-redux';
import Navbar from './Navbar.jsx';
import Hero from './Hero.jsx';
import Reserve from './Reserve.jsx';
import Check from './Check.jsx';
import SlideShow from './SlideShow.jsx';
import Rooms from './Rooms.jsx';
import Amenities from './Amenities.jsx';
import TestimonialCard from './TestimonialCard.jsx';
import Footer from './Footer';
import heroBg from './assets/hero-bg.jpg';
import { toggleReserve } from './actions/uiActions';

function App() {
  const dispatch = useDispatch();
  const isReserveVisible = useSelector((state) => state.ui.showReserveForm);

  const handleReserveClick = () => {
    dispatch(toggleReserve());
  };

  return (
    <>
      <div
        className="relative min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="relative z-10">
          <Navbar />
          <Hero onReserveClick={handleReserveClick} />
        </div>
      </div>
      {isReserveVisible && <Reserve />}
      <Check />
      <SlideShow />
      <Rooms />
      <Amenities />
      <TestimonialCard />
      <Footer />
    </>
  );
}

export default App;