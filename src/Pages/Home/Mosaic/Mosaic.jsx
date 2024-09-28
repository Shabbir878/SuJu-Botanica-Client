import aloevera from "../../../assets/aloevera.jpg";
import bonsai from "../../../assets/bonsai.jpg";
import fiddleleaf from "../../../assets/fiddle-leaf-fig.jpg";
import flower from "../../../assets/flower-947485_1280.jpg";
import leopardlily from "../../../assets/leopard-lily.jpg";
import grass from "../../../assets/grass.jpg";
import tulip from "../../../assets/tulip-plants.jpg";
import foilageplant from "../../../assets/foilage-plant.jpg";
import gardensucculants from "../../../assets/garden-succulents.jpg";
import snakeplant from "../../../assets/snake-plant.jpg";
import springplant from "../../../assets/spring-plant.jpg";
import varietyplant from "../../../assets/variety-pant.jpg";
import rosebush from "../../../assets/rose-bush.jpg";
import whiterose from "../../../assets/white-roses-bouquet.jpg";

const Mosaic = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 p-4">
      {/* First Column */}
      <div className="flex flex-col space-y-4">
        <div className="overflow-hidden flex-grow h-60">
          <img
            src={aloevera}
            alt="Aloe Vera"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="overflow-hidden flex-grow h-60">
          <img
            src={flower}
            alt="Flower"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="overflow-hidden flex-grow h-60">
          <img src={grass} alt="Grass" className="w-full h-full object-cover" />
        </div>
        <div className="overflow-hidden flex-grow h-60">
          <img
            src={aloevera}
            alt="Aloe Vera"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Second Column */}
      <div className="flex flex-col space-y-4">
        <div className="overflow-hidden flex-grow h-60">
          <img src={tulip} alt="Tulip" className="w-full h-full object-cover" />
        </div>
        <div className="overflow-hidden flex-grow h-60">
          <img
            src={foilageplant}
            alt="Foilage Plant"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="overflow-hidden flex-grow h-60">
          <img
            src={snakeplant}
            alt="Snake Plant"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="overflow-hidden flex-grow h-60">
          <img
            src={springplant}
            alt="Spring Plant"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Third Column */}
      <div className="flex flex-col space-y-4">
        <div className="overflow-hidden flex-grow h-60">
          <img
            src={bonsai}
            alt="Bonsai"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="overflow-hidden flex-grow h-60">
          <img
            src={leopardlily}
            alt="Leopard Lily"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="overflow-hidden flex-grow h-60">
          <img
            src={fiddleleaf}
            alt="Fiddle Leaf Fig"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Fourth Column */}
      <div className="flex flex-col space-y-4">
        <div className="overflow-hidden flex-grow h-60">
          <img
            src={varietyplant}
            alt="Variety Plant"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="overflow-hidden flex-grow h-60">
          <img
            src={gardensucculants}
            alt="Garden Succulants"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="overflow-hidden flex-grow h-60">
          <img
            src={rosebush}
            alt="Rose Bush"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="overflow-hidden flex-grow h-60">
          <img
            src={whiterose}
            alt="White Rose"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Mosaic;
