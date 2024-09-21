import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpa, faDumbbell, faSwimmingPool, faBusinessTime, faUtensils, faConciergeBell, faWifi, faDog } from '@fortawesome/free-solid-svg-icons';
import { useInView } from 'react-intersection-observer';

const amenities = [
  { id: 1, icon: faSpa, title: 'Spa', description: 'Relax with our full-service spa offering massages, facials, and more.' },
  { id: 2, icon: faDumbbell, title: 'Fitness Center', description: 'Stay fit with our state-of-the-art gym equipment and fitness classes.' },
  { id: 3, icon: faSwimmingPool, title: 'Swimming Pool', description: 'Enjoy our outdoor pool and hot tub with stunning views.' },
  { id: 4, icon: faBusinessTime, title: 'Business Center', description: 'Fully equipped with meeting rooms, high-speed internet, and printing services.' },
  { id: 5, icon: faUtensils, title: 'Dining', description: 'Experience fine dining, casual eats, and room service.' },
  { id: 6, icon: faConciergeBell, title: 'Concierge Services', description: 'Get assistance with bookings, tours, and local recommendations.' },
  { id: 7, icon: faWifi, title: 'Free Wi-Fi', description: 'Stay connected with complimentary high-speed internet.' },
  { id: 8, icon: faDog, title: 'Pet-Friendly', description: 'We welcome your furry friends with special amenities and services.' },
];

const Amenities = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <div id="amenities" className="bg-gray-100 py-10 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Our Amenities</h2>
        <div
          ref={ref}
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ${inView ? 'animate-slideUp' : 'opacity-0'}`}
        >
          {amenities.map((amenity) => (
            <div
              key={amenity.id}
              className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
            >
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 flex items-center justify-center bg-gray-200 rounded-full mr-4 shadow-md">
                  <FontAwesomeIcon icon={amenity.icon} className="text-black text-4xl" />
                </div>
                <h3 className="text-xl font-semibold">{amenity.title}</h3>
              </div>
              <p className="text-gray-600">{amenity.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Amenities;