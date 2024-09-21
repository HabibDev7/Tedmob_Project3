import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <p className="text-gray-600 text-center flex-grow">© {new Date().getFullYear()} Skyline Suites. All rights reserved.</p>
        <div className="flex space-x-4">
          <a href="#" className="text-black hover:text-gray-700"><FontAwesomeIcon icon={faFacebook} size="lg" /></a>
          <a href="#" className="text-black hover:text-gray-700"><FontAwesomeIcon icon={faTwitter} size="lg" /></a>
          <a href="#" className="text-black hover:text-gray-700"><FontAwesomeIcon icon={faInstagram} size="lg" /></a>
          <a href="#" className="text-black hover:text-gray-700"><FontAwesomeIcon icon={faLinkedin} size="lg" /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;