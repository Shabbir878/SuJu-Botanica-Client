import {
  useAddToCartMutation,
  useGetCartQuery,
  useRemoveFromCartMutation,
  useUpdateCartItemQuantityMutation,
} from "../redux/api/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useCart = () => {
  const { data: cart = [], refetch } = useGetCartQuery();
  const [addToCart] = useAddToCartMutation();
  const [removeFromCart] = useRemoveFromCartMutation();
  const [updateCartItemQuantity] = useUpdateCartItemQuantityMutation();
  const navigate = useNavigate();

  // Function to add item to cart
  const handleAddToCart = async (product) => {
    // Check if product is out of stock
    if (product.quantity <= 0) {
      toast.error(`${product.title} is out of stock`);
      return;
    }

    // Find if the product is already in the cart
    const existingCartItem = cart.find(
      (item) => item.productId === product._id // Ensure _id matches with productId in cart
    );

    if (existingCartItem) {
      // Calculate new quantity
      const newQuantity = existingCartItem.quantity + 1;

      // Check if the new quantity exceeds available stock
      if (newQuantity > product.quantity) {
        toast.error(
          ` ${product.title} is now sold out. Check back soon for restock. `
        );
        return;
      }

      // Update cart item quantity
      const cartResult = await updateCartItemQuantity({
        id: existingCartItem._id, // Ensure to pass the correct ID for the cart item
        quantity: newQuantity,
        productId: product._id, // Use MongoDB ObjectId
      });

      if (cartResult) {
        toast.success(`Updated ${product.title} quantity to ${newQuantity}`);
        refetch();
        navigate("/products/cart");
      }
    } else {
      // Add new product to cart
      const cartResult = await addToCart({
        productId: product._id,
        title: product.title,
        price: product.price,
        quantity: 1,
        image: product.image,
      });

      if (cartResult) {
        toast.success(`${product.title} added to cart`);
        refetch();
        navigate("/products/cart");
      }
    }
  };

  // Function to remove an item from the cart
  const handleRemoveFromCart = async (_id) => {
    try {
      await removeFromCart(_id).unwrap(); // Use MongoDB _id for deletion
      refetch();
      toast.success("Item removed from cart");
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
      toast.error("Failed to remove item from cart");
    }
  };

  // Function to reduce item quantity
  const handleReduceQuantity = async (item) => {
    if (item.quantity <= 1) {
      await handleRemoveFromCart(item.productId);
    } else {
      const newQuantity = item.quantity - 1;
      const result = await updateCartItemQuantity({
        productId: item.productId,
        quantity: newQuantity,
      });

      if (result) {
        toast.success(`Reduced quantity of ${item.title} to ${newQuantity}`);
        refetch();
      }
    }
  };

  return {
    cart,
    refetch,
    handleAddToCart,
    handleRemoveFromCart,
    handleReduceQuantity,
  };
};

export default useCart;
