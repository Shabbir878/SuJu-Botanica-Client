import { FaTrashAlt } from "react-icons/fa";
import useCart from "../../../hooks/useCart";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, refetch, handleRemoveFromCart } = useCart();

  // Calculate total price only for items within stock
  const totalPrice = cart.reduce(
    (total, item) =>
      total + (item.quantity > 0 ? Number(item.price) * item.quantity : 0),
    0
  );

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
        await handleRemoveFromCart(_id);
        await refetch();
        Swal.fire("Deleted!", "Your item has been deleted.", "success");
      } catch (error) {
        console.error("Failed to delete item:", error);
        Swal.fire("Error!", "Failed to delete item.", "error");
      }
    }
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <h2 className="text-lg md:text-2xl">Items: {cart.length}</h2>
        <h2 className="text-lg md:text-2xl">
          Total Price: ${totalPrice.toFixed(2)}
        </h2>
        {cart.length ? (
          <Link to="/products/payments">
            <button className="btn btn-outline font-bold bg-slate-100 border-green-400 border-0 border-b-4 w-full md:w-auto">
              Proceed to Payment
            </button>
          </Link>
        ) : (
          <button
            disabled
            className="btn btn-outline font-bold bg-slate-100 border-green-400 border-0 border-b-4 w-full md:w-auto"
          >
            Proceed to Payment
          </button>
        )}
      </div>

      <div className="flex justify-center md:justify-end mt-6">
        {cart.length > 0 && (
          <button
            onClick={handleRemoveAll}
            className="px-4 py-2 bg-red-500 text-white rounded-md text-sm md:text-base"
          >
            Clear All Items
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full min-w-[600px]">
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
              <tr key={item.productId}>
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
                <td>${item.price}</td>
                <td>{item.quantity}</td>
                <td>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn btn-ghost text-red-600 text-lg"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cart;
