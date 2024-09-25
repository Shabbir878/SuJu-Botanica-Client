import { useParams, useNavigate } from "react-router-dom";
import { useGetASingleProductQuery } from "../../../redux/api/api";
import useCart from "../../../hooks/useCart";
import Swal from "sweetalert2";
import Loading from "../../Shared/Loading/Loading";

const ProductDetails = () => {
  const { productId } = useParams(); // Get the productId from the URL
  const navigate = useNavigate(); // Initialize navigate
  const {
    data: product,
    isLoading,
    error,
  } = useGetASingleProductQuery({ id: productId }); // Fetch product details

  const { handleAddToCart } = useCart(); // Use handleAddToCart from custom hook

  const handleAddItemToCart = async () => {
    if (!product) return; // Check if product exists

    // Prepare the product data for the cart
    const productData = {
      productId: product._id, // Use productId instead of menuId
      title: product.title,
      description: product.details, // Assuming 'details' is the description
      price: parseFloat(product.price),
      quantity: 1, // Default to 1 when adding to the cart
      rating: parseFloat(product.rating),
      category: product.category,
      image: product.image, // Assuming product.image is the URL
    };

    try {
      // Add to cart using handleAddToCart from useCart hook
      await handleAddToCart(productData);

      // Show success message
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${product.title} added to the cart`,
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        // Navigate to the cart page after the alert closes
        navigate("/products/cart");
      });
    } catch (error) {
      // Handle any error that might occur during the add-to-cart process
      console.error("Failed to add product to cart:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while adding the product to the cart.",
      });
    }
  };

  // Loading and error handling
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

  if (!product) {
    return <p>Product not found</p>;
  }

  // JSX structure for product details
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
            onClick={handleAddItemToCart} // Trigger handleAddItemToCart on click
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
