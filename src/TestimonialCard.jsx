import { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useInView } from 'react-intersection-observer';
import m1 from './assets/User/m1.webp';
import f1 from './assets/User/f1.avif';
import f2 from './assets/User/f2.webp';

const testimonials = [
  {
    id: 1,
    name: 'Jane Doe',
    photo: f1,
    text: 'Wonderful stay! The service was excellent and the amenities were top-notch.',
    rating: 5
  },
  {
    id: 2,
    name: 'John Smith',
    photo: m1,
    text: 'Great experience. The room was clean, and the staff were friendly and helpful.',
    rating: 4
  },
  {
    id: 3,
    name: 'Emily Johnson',
    photo: f2,
    text: 'Amazing hotel with beautiful views. The breakfast was also fantastic!',
    rating: 5
  },
];

const TestimonialCard = ({ testimonial }) => {
  const { name, photo, text, rating } = testimonial;

  return (
    <div id="testimonial" className="bg-white p-6 rounded-lg shadow-lg flex max-w-md mx-auto">
      <div className="w-1/3">
        <img src={photo} alt={`${name}'s photo`} className="w-full h-full object-cover rounded-l-lg" />
      </div>
      <div className="w-2/3 pl-6 border-l-2 border-gray-300">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <div className="flex mb-2">
          {[...Array(rating)].map((_, i) => (
            <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-400" />
          ))}
        </div>
        <p className="text-gray-600">{text}</p>
      </div>
    </div>
  );
};

TestimonialCard.propTypes = {
  testimonial: PropTypes.shape({
    name: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
  }).isRequired,
};

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="bg-gray-100 py-10 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Guest Testimonials</h2>
        <div className="relative flex items-center justify-center">
          <button
            onClick={handlePrev}
            className="absolute left-0 bg-teal-500 text-white rounded-full p-2 focus:outline-none"
          >
            &lt;
          </button>
          <div
            ref={ref}
            className={`w-full flex justify-center ${inView ? 'animate-slideUp' : 'opacity-0'}`}
          >
            <TestimonialCard testimonial={testimonials[currentIndex]} />
          </div>
          <button
            onClick={handleNext}
            className="absolute right-0 bg-teal-500 text-white rounded-full p-2 focus:outline-none"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;