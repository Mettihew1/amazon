
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
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYksZ9Y_S73vBcVj2Ebdq5RfR4zVUy7LriEM1ilUVoT_UYTReLJRqCJUEEyxJ7vdFCGy4&usqp=CAU"
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