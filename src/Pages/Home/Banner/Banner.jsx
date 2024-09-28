import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // carousel styles
import img1 from "../../../assets/banner.jpg";
import img2 from "../../../assets/banner2.jpg";
import img3 from "../../../assets/banner3.jpg";

const Banner = () => {
  const bannerData = [
    {
      id: 1,
      image: img1,
      subText: "FloraVista Haven",
      text: "Leopard Lily",
      details:
        "The symbol of strength and resilience. Purify your home with leopard lily plants.",
    },
    {
      id: 2,
      image: img2,
      subText: "FloraVista Haven",
      text: "Calathea Plant",
      details:
        "It is a long established fact a reader by the readable content looking.",
    },
    {
      id: 3,
      image: img3,
      subText: "FloraVista Haven",
      text: "Spring Plant",
      details:
        "We’re Spring Plant, When you’ve got your health, you got everything.",
    },
  ];

  return (
    <Carousel
      showArrows={true}
      autoPlay={true}
      infiniteLoop={true}
      showThumbs={false}
      showStatus={false}
      dynamicHeight={false}
      stopOnHover={true}
      interval={5000}
    >
      {bannerData.map((banner) => (
        <div key={banner.id} className="relative">
          <img
            src={banner.image}
            alt={banner.text}
            className="w-full h-[300px] md:h-[500px] lg:h-[600px] object-cover" // Adjust height based on device size
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center md:items-start p-4 sm:p-8">
            <p className="text-green-200 text-sm sm:text-lg mt-2 sm:mt-4 font-bold">
              {banner.subText}
            </p>
            <h2 className="text-white text-xl sm:text-2xl lg:text-4xl font-bold">
              {banner.text}
            </h2>
            <p className="text-gray-300 text-xs sm:text-sm md:text-lg lg:text-xl mt-2 font-bold w-full sm:w-5/6 md:w-2/3 lg:w-1/2 xl:w-1/3">
              {banner.details}
            </p>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default Banner;
