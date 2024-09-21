import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import im1 from './assets/image/image1.jpeg';
import im2 from './assets/image/image2.jpeg';
import im3 from './assets/image/image3.jpg';
import im4 from './assets/image/image4.jpeg';
import im5 from './assets/image/image5.jpg';

const SlideShow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images] = useState([im1, im2, im3, im4, im5]);
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [images]);

  return (
    <div
      ref={ref}
      className={`relative w-full h-screen p-8 transition-opacity duration-1000 ${inView ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="relative w-full h-full overflow-hidden shadow-lg">
        <img
          src={images[currentIndex]}
          alt="Slide"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000"
        />
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <span
              key={index}
              className={`h-2 w-2 rounded-full transition-all duration-300 ease-in-out ${
                index === currentIndex
                  ? 'bg-white scale-150 opacity-100'
                  : 'bg-gray-400 scale-100 opacity-50'
              }`}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SlideShow;