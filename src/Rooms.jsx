import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import RoomCard from './RoomCard';
import im1 from './assets/room-image/single.jpeg';
import im2 from './assets/room-image/double.avif';
import im3 from './assets/room-image/twin.jpg';
import im4 from './assets/room-image/suite.jpg';
import im5 from './assets/room-image/deluxe.jpg';
import im6 from './assets/room-image/executive.jpg';
import im7 from './assets/room-image/family.jpg';
import im8 from './assets/room-image/presidential.jpg';

const roomData = [
  { 
    image: im1, 
    title: "Single Room", 
    description: "A single room is designed for one person, with a single bed and limited space.",
    price: "$100 per night",
    view: "Mountain view",
    amenities: ["24/7 Electricity", "Wi-Fi 24/7", "Mini-bar available"],
    exclusives: "Single bed, compact size"
  },
  { 
    image: im2, 
    title: "Double Room", 
    description: "A double room is designed for two people, with two single beds or one double bed.",
    price: "$150 per night",
    view: "Sea view",
    amenities: ["24/7 Electricity", "Wi-Fi 24/7", "Mini-bar available"],
    exclusives: "Double bed, spacious"
  },
  { 
    image: im3, 
    title: "Twin Room", 
    description: "A twin room is similar to a double room, but with two separate single beds.",
    price: "$120 per night",
    view: "Mountain view",
    amenities: ["24/7 Electricity", "Wi-Fi 24/7", "Mini-bar available"],
    exclusives: "Two separate beds"
  },
  { 
    image: im4, 
    title: "Suite", 
    description: "A suite is a larger room that typically includes a separate living area, bedroom, and sometimes a kitchenette.",
    price: "$250 per night",
    view: "Sea view",
    amenities: ["24/7 Electricity", "Wi-Fi 24/7", "Mini-bar available", "Kitchenette"],
    exclusives: "Separate living area and bedroom"
  },
  { 
    image: im5, 
    title: "Deluxe Room", 
    description: "A deluxe room is a higher-end room that offers more luxurious amenities, such as a larger bed, a separate living area, and upgraded bathroom facilities.",
    price: "$200 per night",
    view: "Sea view",
    amenities: ["24/7 Electricity", "Wi-Fi 24/7", "Mini-bar available", "Upgraded bathroom"],
    exclusives: "Larger bed and upgraded amenities"
  },
  { 
    image: im6, 
    title: "Executive Room", 
    description: "An executive room is designed for business travelers, often with a larger workspace, a comfortable seating area, and upgraded amenities.",
    price: "$180 per night",
    view: "City view",
    amenities: ["24/7 Electricity", "Wi-Fi 24/7", "Mini-bar available", "Workspace"],
    exclusives: "Larger workspace and business amenities"
  },
  { 
    image: im7, 
    title: "Family Room", 
    description: "A family room is designed for families with children, often with a separate bedroom and a living area with a sofa bed.",
    price: "$220 per night",
    view: "Mountain view",
    amenities: ["24/7 Electricity", "Wi-Fi 24/7", "Mini-bar available", "Sofa bed"],
    exclusives: "Separate bedroom and living area"
  },
  { 
    image: im8, 
    title: "Presidential Suite", 
    description: "A presidential suite is the most luxurious type of room, often with multiple bedrooms, a large living area, and high-end amenities like a private balcony or butler service.",
    price: "$500 per night",
    view: "Sea view",
    amenities: ["24/7 Electricity", "Wi-Fi 24/7", "Mini-bar available", "Private balcony", "Butler service"],
    exclusives: "Multiple bedrooms and luxury amenities"
  }
];

const Rooms = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const handleCardClick = (index) => {
    setSelectedRoom(index);
  };

  const handleBackClick = () => {
    setSelectedRoom(null);
  };

  return (
    <div
      id="room"
      ref={ref}
      className={`flex flex-col items-center mt-10 ${inView ? 'animate-slideUp' : 'opacity-0'}`}
    >
      {selectedRoom === null ? (
        <div className="flex flex-wrap -mx-4">
          {roomData.map((room, index) => (
            <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-6">
              <RoomCard
                image={room.image}
                altText={room.title}
                onClick={() => handleCardClick(index)}
              />
              <h3 className="text-center text-lg font-semibold mt-2">{room.title}</h3>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 max-w-4xl mx-auto bg-white rounded-lg shadow-xl border border-gray-300">
          <button
            className="mb-6 px-6 py-2 bg-teal-500 text-white rounded-lg shadow hover:bg-teal-700 transition"
            onClick={handleBackClick}
          >
            Back to Rooms
          </button>
          <div
            className="bg-cover bg-center h-96 rounded-lg mb-8"
            style={{ backgroundImage: `url(${roomData[selectedRoom].image})` }}
          ></div>
          <h3 className="text-4xl font-bold mb-4 text-gray-800">{roomData[selectedRoom].title}</h3>
          <p className="text-gray-700 text-lg mb-6">{roomData[selectedRoom].description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-100 p-6 rounded-lg border border-gray-300 shadow-md">
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Price</h4>
              <p className="text-gray-600 text-lg">{roomData[selectedRoom].price}</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg border border-gray-300 shadow-md">
              <h4 className="text-xl font-semibold text-gray-800 mb-2">View</h4>
              <p className="text-gray-600 text-lg">{roomData[selectedRoom].view}</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg border border-gray-300 shadow-md col-span-2">
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Exclusives</h4>
              <p className="text-gray-600 text-lg">{roomData[selectedRoom].exclusives}</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg border border-gray-300 shadow-md col-span-2">
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Amenities</h4>
              <ul className="list-disc list-inside ml-4 text-gray-600">
                {roomData[selectedRoom].amenities.map((amenity, index) => (
                  <li key={index}>{amenity}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rooms;