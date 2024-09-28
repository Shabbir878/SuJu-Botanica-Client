import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Rating } from "@smastrom/react-rating";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useGetReviewsQuery } from "../../../redux/api/api";
import Loading from "../../Shared/Loading/Loading";

// Import Swiper and Rating styles
import "swiper/css";
import "swiper/css/navigation";
import "@smastrom/react-rating/style.css";
import { FaQuoteLeft } from "react-icons/fa";

const Reviews = () => {
  // Use the custom hook from RTK Query to fetch reviews
  const { data: reviews, error, isLoading } = useGetReviewsQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen mt-10">
        <Loading />
      </div>
    );
  }

  if (error) {
    return <p>Something went wrong: {error.message}</p>;
  }

  return (
    <section className="my-8">
      <SectionTitle subHeading="What Our Client Say" heading="Reviews" />

      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {reviews.map((review) => (
          <SwiperSlide key={review._id.$oid}>
            {/* Use review._id.$oid as a key */}
            <div className="flex flex-col items-center mx-24 my-16">
              <Rating
                style={{ maxWidth: 180 }}
                value={review.rating}
                readOnly
              />
              <div className="flex justify-center mt-4">
                <FaQuoteLeft className="text-7xl"></FaQuoteLeft>
              </div>
              <p className="py-8">{review.review}</p> {/* Review text */}
              <h3 className="text-2xl text-green-400 font-bold">
                {review.name}
              </h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Reviews;
