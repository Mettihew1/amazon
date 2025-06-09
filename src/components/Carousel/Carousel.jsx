
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Carousel.css';

function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    adaptiveHeight: false, // Disable for fixed height
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        <div className="slide">
          <img
            src="https://fashiontikos.com/wp-content/uploads/2025/01/Lena-Paul-Bio-1.jpg"
            alt="Banner"
            className="carousel-image"
          />
        </div>
        {/* Add other slides */}
      </Slider>
    </div>
  );
}

export default Carousel;