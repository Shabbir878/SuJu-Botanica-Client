const ProductCard = ({ product }) => {
  return (
    <div className="border border-gray-300 space-y-4 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
      />
      <div className="p-4 flex flex-col justify-between h-full">
        <div>
          <h3 className="font-semibold text-lg text-gray-800">
            {product.title}
          </h3>
          <p className="text-gray-600 text-sm">
            <span className="font-bold">Price:</span>{" "}
            <span className="font-semibold">${product.price}</span>
          </p>
          <p className="text-gray-500 text-sm mb-2">
            <span className="font-bold">Details:</span> {product.details}
          </p>
          <p className="text-gray-500 text-sm mb-2">
            <span className="font-bold">Available Quantity:</span>{" "}
            <span className="font-semibold">{product.quantity}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
