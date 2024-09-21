import PropTypes from 'prop-types';

const RoomCard = ({ image, altText, onClick }) => {
  return (
    <div
      className="bg-cover bg-center h-64 rounded-lg cursor-pointer"
      style={{ backgroundImage: `url(${image})` }}
      onClick={onClick}
      aria-label={altText}
    >
    </div>
  );
};

RoomCard.propTypes = {
  image: PropTypes.string.isRequired,
  altText: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

RoomCard.defaultProps = {
  altText: 'Room image',
};

export default RoomCard;