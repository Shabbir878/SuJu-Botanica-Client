import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import Mosaic from "../Mosaic/Mosaic";

const PopularCategory = () => {
  return (
    <section>
      <SectionTitle
        subHeading="Popular Categories"
        heading="From Our Collection"
      />
      <Mosaic />
    </section>
  );
};

export default PopularCategory;
