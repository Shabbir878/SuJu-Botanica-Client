import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { useGetASingleProductQuery } from "../../../redux/api/api";
import useCart from "../../../hooks/useCart"; // Adjust the import path to your useCart hook
import Swal from "sweetalert2"; // Make sure to install and import SweetAlert

const ProductDetails = () => {
  const { productId } = useParams(); // Get the productId from the URL
  const navigate = useNavigate(); // Initialize navigate
  const {
    data: product,
    isLoading,
    error,
  } = useGetASingleProductQuery({ id: productId }); // Fetch product details

  const { handleAddToCart } = useCart(); // Destructure the function from your custom hook

  const handleAddItemToCart = () => {
    // Prepare the product data
    const productData = {
      title: product.title,
      description: product.details, // Assuming 'details' corresponds to the description
      price: parseFloat(product.price),
      quantity: parseInt(product.quantity),
      rating: parseFloat(product.rating),
      category: product.category,
      image: product.image, // Assuming product.image is already the URL
    };

    // Add to cart using the prepared product data
    handleAddToCart({
      productId: product._id, // Use productId instead of menuId
      ...productData, // Spread the product data into the cart item
    });

    // Show success message
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: `${product.title} added to the cart`,
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      // Navigate to cart after the alert is closed
      navigate("/products/cart");
    });
  };

  if (isLoading) {
    return <p>Loading...</p>; // Show loading indicator
  }

  if (error) {
    return <p>Something went wrong: {error.message}</p>; // Handle error state
  }

  if (!product) {
    return <p>Product not found</p>; // Handle case where product is not available
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 lg:p-8">
      {/* Left side: Product image */}
      <div className="flex-1">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-auto rounded-lg shadow-md"
        />
      </div>

      {/* Right side: Product details */}
      <div className="flex-1 flex flex-col">
        <div className="flex-grow">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-lg mt-2">
            <span className="font-semibold">Category: </span>
            {product.category}
          </p>
          <p className="text-lg mt-2">
            <span className="font-semibold">Price: </span>${product.price}
          </p>
          <p className="text-lg mt-2">
            <span className="font-semibold">Quantity: </span>
            {product.quantity}
          </p>
          <p className="text-lg mt-2">
            <span className="font-semibold">Rating: </span>
            {product.rating}
          </p>
          <p className="text-lg mt-2">{product.details}</p>
        </div>

        {/* Add to cart button */}
        <div className="mt-2">
          <button
            onClick={handleAddItemToCart} // Call the function on click
            className="btn btn-outline font-bold bg-slate-100 border-green-400 border-0 border-b-4 w-full sm:w-auto"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
