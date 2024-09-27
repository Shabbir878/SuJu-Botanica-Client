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
    try {
      // Check if product is out of stock
      if (product.quantity <= 0) {
        toast.error(`${product.title} is out of stock`);
        return;
      }

      // Check if the product already exists in the cart
      const existingItem = cart.find((item) => item.productId === product._id);

      // If product exists, update the quantity (without exceeding available stock)
      if (existingItem) {
        if (existingItem.quantity < product.quantity) {
          const updatedItem = {
            ...existingItem,
            quantity: existingItem.quantity + 1,
          };
          await addToCart(updatedItem).unwrap();
          toast.success(`Updated quantity of ${product.title}`);
        } else {
          toast.error(
            `Cannot add more than available stock for ${product.title}`
          );
        }
      } else {
        // Add new product to the cart
        const newItem = {
          productId: product._id, // Use MongoDB ObjectId
          title: product.title,
          price: product.price,
          quantity: 1, // Start with 1 quantity
          image: product.image,
        };
        await addToCart(newItem).unwrap();
        toast.success(`${product.title} added to cart`);
        navigate("/products/cart");
      }

      // Refetch to update cart state
      refetch();
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      toast.error("Failed to add item to cart");
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
    try {
      if (item.quantity > 1) {
        const updatedQuantity = item.quantity - 1;
        await updateCartItemQuantity({
          id: item._id,
          quantity: updatedQuantity,
        }).unwrap();
        toast.success(`Reduced quantity of ${item.title}`);
      } else {
        toast.error(`${item.title} cannot be reduced further`);
      }
      refetch();
    } catch (error) {
      console.error("Failed to update item quantity:", error);
      toast.error("Failed to update item quantity");
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
