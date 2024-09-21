import { useDispatch, useSelector } from 'react-redux';
import { toggleMobileMenu } from './actions/uiActions';
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Link } from 'react-scroll';
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const dispatch = useDispatch();
  const isMobileMenuOpen = useSelector((state) => state.ui.mobileMenuOpen);

  const handleToggleMobileMenu = () => {
    dispatch(toggleMobileMenu());
    console.log('Mobile Menu Open State:', isMobileMenuOpen);
  };  

  return (
    <div className="bg-transparent p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-white cursor-pointer">
            <FaPhoneAlt className="text-xl" />
            <span className="ml-2 text-sm">+961 01 100200</span>
          </div>
          <div className="flex items-center text-white cursor-pointer">
            <FaEnvelope className="text-xl" />
            <span className="ml-2 text-sm">info@skyline.com</span>
          </div>
        </div>

        <div className="flex space-x-4">
          <a href="#" className="text-white hover:text-gray-300 text-xl cursor-pointer">
            <FaFacebookF />
          </a>
          <a href="#" className="text-white hover:text-gray-300 text-xl cursor-pointer">
            <FaTwitter />
          </a>
          <a href="#" className="text-white hover:text-gray-300 text-xl cursor-pointer">
            <FaInstagram />
          </a>
          <a href="#" className="text-white hover:text-gray-300 text-xl cursor-pointer">
            <FaLinkedinIn />
          </a>
        </div>
      </div>

      <hr className="my-2 border-t-2 border-white w-full" />

      <div className="flex justify-between items-center">
        <div className="text-3xl font-bold text-white cursor-pointer">
          Skyline Suites
        </div>

        <div className="lg:hidden">
          <button
            onClick={handleToggleMobileMenu}
            className="text-white text-2xl focus:outline-none cursor-pointer"
          >
            <GiHamburgerMenu />
          </button>
        </div>

        <nav className={`hidden lg:flex space-x-12`}>
          <Link to="hero" smooth={true} duration={500} className="text-white hover:text-gray-300 font-medium cursor-pointer">
            Hotel Overview
          </Link>
          <Link to="room" smooth={true} duration={500} className="text-white hover:text-gray-300 font-medium cursor-pointer">
            Rooms
          </Link>
          <Link to="amenities" smooth={true} duration={500} className="text-white hover:text-gray-300 font-medium cursor-pointer">
            Amenities
          </Link>
          <Link to="testimonial" smooth={true} duration={500} className="text-white hover:text-gray-300 font-medium cursor-pointer">
            Testimonials
          </Link>
        </nav>
      </div>

      <nav className={`lg:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <ul className="flex flex-col space-y-4">
          <li>
            <Link to="hero" smooth={true} duration={500} className="text-white hover:text-gray-300 font-medium cursor-pointer">
              Hotel Overview
            </Link>
          </li>
          <li>
            <Link to="room" smooth={true} duration={500} className="text-white hover:text-gray-300 font-medium cursor-pointer">
              Rooms
            </Link>
          </li>
          <li>
            <Link to="amenities" smooth={true} duration={500} className="text-white hover:text-gray-300 font-medium cursor-pointer">
              Amenities
            </Link>
          </li>
          <li>
            <Link to="testimonial" smooth={true} duration={500} className="text-white hover:text-gray-300 font-medium cursor-pointer">
              Testimonials
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;