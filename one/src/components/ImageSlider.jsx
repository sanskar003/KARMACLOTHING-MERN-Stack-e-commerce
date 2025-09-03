import { useState } from "react";

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative flex justify-center items-center w-full h-full overflow-hidden rounded-lg">
      {images.length > 0 ? (
        <div>
          <div className="flex items-center justify-center w-full h-full ">
            <img
              src={images[currentIndex]}
              alt={`Slide ${currentIndex}`}
              className="w-[70%] object-contain transition-all duration-300 ease-in-out"
            />
          </div>
          {images.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-amber-200  bg-opacity-50 px-0.5 py-1 text-white rounded-full"
              >
                <img
                  className="w-8 h-8 rotate-180"
                  src="https://img.icons8.com/?size=100&id=DydnsatR799b&format=png&color=000000"
                  alt=""
                />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-amber-200 bg-opacity-50 px-0.5 py-1 text-white rounded-full"
              >
                <img
                  className="w-8 h-8 "
                  src="https://img.icons8.com/?size=100&id=DydnsatR799b&format=png&color=000000"
                  alt=""
                />
              </button>
            </>
          )}
        </div>
      ) : (
        <img src={images} alt="Fallback" />
      )}
    </div>
  );
};

export default ImageSlider;
