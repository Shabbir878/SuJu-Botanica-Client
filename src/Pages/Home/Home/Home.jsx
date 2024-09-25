import Banner from "../Banner/Banner";
import { Helmet } from "react-helmet-async";
import PopularCategory from "../PopularCategory/PopularCategory";
import ScrollButton from "./ScrollButton";
import HomeProducts from "../HomeProducts/HomeProducts";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>SuJu Botanica | Home</title>
      </Helmet>
      <Banner />
      <HomeProducts />
      <PopularCategory />
      <ScrollButton />
    </div>
  );
};

export default Home;
