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

  // Function to add item to cart with quantity management logic
  const handleAddToCart = async (product) => {
    try {
      const existingItem = cart.find((item) => item.productId === product._id);

      // If the product already exists in the cart
      if (existingItem) {
        if (existingItem.quantity < product.quantity) {
          const updatedCart = cart.map((item) =>
            item.productId === product._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );

          await addToCart({ cart: updatedCart }).unwrap();
          refetch();
          toast.success(`${product.title} quantity increased in the cart`);
        } else {
          toast.error("Maximum quantity reached");
        }
      } else {
        // If the product is not in the cart, add it with quantity 1
        const newCartItem = {
          productId: product._id,
          title: product.title,
          price: product.price,
          quantity: 1,
          image: product.image,
        };

        await addToCart(newCartItem).unwrap();
        refetch();
        toast.success(`${product.title} added to the cart`);
      }

      navigate("/products/cart"); // Navigate to cart after adding/updating
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      toast.error("Failed to add item to cart");
    }
  };

  const handleRemoveFromCart = async (id) => {
    try {
      await removeFromCart(id).unwrap();
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
