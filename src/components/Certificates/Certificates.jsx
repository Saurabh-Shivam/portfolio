import React, { useEffect, useState, useRef } from "react";
import { certificates } from "../../constants";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Certificates = () => {
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const modalRef = useRef(null);
  const scrollPositionRef = useRef(0);

  const handleOpenModal = (certificate) => {
    scrollPositionRef.current = window.pageYOffset;
    setSelectedCertificate(certificate);
  };

  const handleCloseModal = () => {
    setSelectedCertificate(null);
    setTimeout(() => {
      window.scrollTo(0, scrollPositionRef.current);
    }, 0);
  };

  const handlePrevCertificate = () => {
    const currentIndex = certificates.findIndex(
      (cert) => cert.id === selectedCertificate.id
    );
    const prevIndex =
      (currentIndex - 1 + certificates.length) % certificates.length;
    setSelectedCertificate(certificates[prevIndex]);
  };

  const handleNextCertificate = () => {
    const currentIndex = certificates.findIndex(
      (cert) => cert.id === selectedCertificate.id
    );
    const nextIndex = (currentIndex + 1) % certificates.length;
    setSelectedCertificate(certificates[nextIndex]);
  };

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleCloseModal();
      }
    };

    if (selectedCertificate) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedCertificate]);

  // Handle scroll locking
  useEffect(() => {
    if (selectedCertificate) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [selectedCertificate]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (selectedCertificate) {
        if (event.key === "ArrowLeft") {
          handlePrevCertificate();
        } else if (event.key === "ArrowRight") {
          handleNextCertificate();
        } else if (event.key === "Escape") {
          handleCloseModal();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedCertificate]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const modalSettings = {
    ...settings,
    slidesToShow: 1,
    autoplay: false,
  };

  if (!certificates || certificates.length === 0) {
    return (
      <section
        id="certificates"
        className="py-24 pb-24 px-[12vw] md:px-[7vw] lg:px-[20vw] font-sans bg-skills-gradient"
      >
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
            CERTIFICATES
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-4">
            Loading certificates...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="certificates"
      className="py-24 pb-24 px-[12vw] md:px-[7vw] lg:px-[20vw] font-sans bg-skills-gradient"
    >
      {/* Section Title */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
          CERTIFICATES
        </h2>
        <div className="w-32 h-1 bg-purple-500 mx-auto mt-4"></div>
        <p className="text-gray-600 dark:text-gray-400 mt-4 text-lg font-semibold">
          A showcase of my professional certifications and achievements
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="[&_.slick-slide]:px-4 [&_.slick-dots]:bottom-[-40px] [&_.slick-dots_li_button:before]:text-[#8245ec] [&_.slick-dots_li_button:before]:text-[10px] [&_.slick-dots_li.slick-active_button:before]:text-[#8245ec] [&_.slick-prev:before]:text-[#8245ec] [&_.slick-next:before]:text-[#8245ec]">
          <Slider {...settings}>
            {certificates.map((certificate) => (
              <div key={certificate.id}>
                <div
                  onClick={() => handleOpenModal(certificate)}
                  className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 transform hover:scale-105 transition-transform duration-300 cursor-pointer"
                >
                  <div className="relative pb-[75%]">
                    <img
                      src={certificate.image}
                      alt={certificate.name}
                      className="absolute top-0 left-0 w-full h-full object-contain p-2"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-center text-gray-800 dark:text-gray-200">
                      {certificate.name}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* Modal */}
      {selectedCertificate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div
            ref={modalRef}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-5xl my-8 relative"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedCertificate.name}
                </h3>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="relative pb-[56.25%]">
                <img
                  src={selectedCertificate.image}
                  alt={selectedCertificate.name}
                  className="absolute top-0 left-0 w-full h-full object-contain"
                />
              </div>
            </div>
            {/* Navigation Arrows */}
            <button
              onClick={handlePrevCertificate}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={handleNextCertificate}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Certificates;
