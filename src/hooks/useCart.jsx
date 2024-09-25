import {
  useAddToCartMutation,
  useGetCartQuery,
  useRemoveFromCartMutation,
} from "../redux/api/api";

const useCart = () => {
  // Fetch cart data
  const { data: cart = [], refetch } = useGetCartQuery();

  // Define mutations for adding and removing items from the cart
  const [addToCart] = useAddToCartMutation();
  const [removeFromCart] = useRemoveFromCartMutation();

  // Function to add item to cart
  const handleAddToCart = async (item) => {
    try {
      await addToCart(item).unwrap(); // unwrapping to handle success/error
      refetch(); // refetch cart after adding
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    }
  };

  // Function to remove item from cart
  const handleRemoveFromCart = async (id) => {
    try {
      await removeFromCart(id).unwrap(); // unwrapping to handle success/error
      refetch(); // refetch cart after removal
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
