import { FaTrashAlt } from "react-icons/fa";
import useCart from "../../../hooks/useCart";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Cart = () => {
  const { cart, refetch, handleRemoveFromCart } = useCart();

  // Calculate total price
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Function to clear all items from the cart
  const handleRemoveAll = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will remove all items from your cart!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, clear all!",
    });

    if (result.isConfirmed) {
      try {
        // Loop through the cart and remove each item using productId
        for (const item of cart) {
          await handleRemoveFromCart(item._id);
        }
        await refetch();
        Swal.fire(
          "Cleared!",
          "All items have been removed from your cart.",
          "success"
        );
      } catch (error) {
        console.error("Failed to clear cart:", error);
        Swal.fire("Error!", "Failed to clear cart items.", "error");
      }
    }
  };

  const handleDelete = async (_id) => {
    // Expect MongoDB _id, not productId
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await handleRemoveFromCart(_id); // Pass the MongoDB ObjectId (_id)
        await refetch();
        Swal.fire("Deleted!", "Your item has been deleted.", "success");
      } catch (error) {
        console.error("Failed to delete item:", error);
        Swal.fire("Error!", "Failed to delete item.", "error");
      }
    }
  };

  return (
    <div>
      <Helmet>
        <title>SuJu Botanica | Cart</title>
      </Helmet>

      {/* Cart Summary */}
      <div className="flex justify-evenly mb-8">
        <h2 className="text-4xl">Items: {cart.length}</h2>
        <h2 className="text-4xl">Total Price: ${totalPrice.toFixed(2)}</h2>
        {cart.length ? (
          <Link to="/dashboard/payment">
            <button className="btn btn-primary">Pay</button>
          </Link>
        ) : (
          <button disabled className="btn btn-primary">
            Pay
          </button>
        )}
      </div>

      {/* Clear All Button */}
      <div className="flex justify-center md:justify-end mt-10">
        <button
          onClick={handleRemoveAll}
          className="px-4 py-2 bg-red-500 text-white rounded-sm"
        >
          Clear All Items
        </button>
      </div>

      {/* Cart Table */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={`${item.productId}-${index}`}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={item.image} alt={item.title} />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{item.title}</td>
                <td>${item.price ? item.price.toFixed(2) : "N/A"}</td>
                <td>{item.quantity}</td>
                <th>
                  <button
                    onClick={() => handleDelete(item._id)} // Ensure correct productId is passed
                    className="btn btn-ghost btn-lg"
                  >
                    <FaTrashAlt className="text-red-600" />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cart;
