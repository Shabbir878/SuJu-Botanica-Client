import {
  useAddToCartMutation,
  useGetCartQuery,
  useRemoveFromCartMutation,
} from "../redux/api/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useCart = () => {
  const { data: cart = [], refetch } = useGetCartQuery();
  const [addToCart] = useAddToCartMutation();
  const [removeFromCart] = useRemoveFromCartMutation();
  const navigate = useNavigate();

  // Function to add item to cart
  const handleAddToCart = async (product) => {
    try {
      const itemData = {
        productId: product._id, // Use MongoDB ObjectId here
        title: product.title,
        price: product.price,
        quantity: 1, // Default quantity when adding the item
        image: product.image,
      };
      await addToCart(itemData).unwrap(); // This sends the data with the ObjectId
      refetch();
      toast.success(`${product.title} added to the cart`);

      // Navigate to the cart page after adding to cart
      navigate("/products/cart");
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    }
  };

  // Function to remove item from cart using MongoDB ObjectId
  const handleRemoveFromCart = async (_id) => {
    // Accept _id from MongoDB
    console.log("Removing item with _id:", _id); // Log the correct _id
    try {
      await removeFromCart(_id).unwrap(); // Pass MongoDB ObjectId directly
      refetch();
      toast.success("Item removed from cart");
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
    }
  };

  return {
    cart,
    refetch,
    handleAddToCart,
    handleRemoveFromCart,
  };
};

export default useCart;
