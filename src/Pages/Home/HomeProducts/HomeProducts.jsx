import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { FaRegHeart } from "react-icons/fa";

import slide1 from "../../../assets/aloevera.jpg";
import slide2 from "../../../assets/bonsai.jpg";
import slide3 from "../../../assets/rose-bush.jpg";
import slide4 from "../../../assets/snake-plant.jpg";
import slide5 from "../../../assets/fiddle-leaf-fig.jpg";
import slide6 from "../../../assets/leopard-lily.jpg";
import slide7 from "../../../assets/garden-succulents.jpg";
import slide8 from "../../../assets/grass.jpg";
import slide9 from "../../../assets/foilage-plant.jpg";
import { Link } from "react-router-dom";

const products = [
  { id: 1, name: "Aloe Vera", image: slide1, rating: 4.5 },
  { id: 2, name: "Bonsai", image: slide2, rating: 4.8 },
  { id: 3, name: "Rose Bush", image: slide3, rating: 4.3 },
  { id: 4, name: "Snake Plant", image: slide4, rating: 4.7 },
  { id: 5, name: "Fiddle Leaf Fig", image: slide5, rating: 4.6 },
  { id: 6, name: "Leopard Lilly", image: slide6, rating: 4.2 },
  { id: 7, name: "Garden Succulents", image: slide7, rating: 4.5 },
  { id: 8, name: "Grass", image: slide8, rating: 4.1 },
  { id: 9, name: "Foilage Plant", image: slide9, rating: 4.4 },
];

const HomeProducts = () => {
  // Remove the products prop
  return (
    <section>
      <SectionTitle
        subHeading={"From 11:00am to 10:00pm"}
        heading={"ORDER ONLINE"}
      />

      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {products.map((item) => (
          <SwiperSlide key={item.id}>
            <img src={item.image} alt={item.name} />
            <h3 className="text-xs md:text-xl text-green-800 uppercase font-bold text-center -mt-6 md:-mt-14">
              {item.name}
            </h3>
            <div className="absolute flex items-center justify-center gap-1 top-4 right-4 text-green-400">
              <FaRegHeart className="text-center text-xl mt-1" />
              <h5 className="text-xl font-semibold">{item.rating}</h5>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="text-center">
        <Link to="/products/allProducts">
          <button className="btn btn-outline font-bold bg-slate-100 border-green-400 border-0 border-b-4 mt-4">
            View More Products
          </button>
        </Link>
      </div>
    </section>
  );
};

// Remove PropTypes since products is no longer a prop
export default HomeProducts;
