import { FaTrashAlt } from "react-icons/fa";
import useCart from "../../../hooks/useCart";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, refetch, handleRemoveFromCart } = useCart(); // Ensure correct destructuring

  // Calculate total price
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Function to clear all items from the cart
  const handleRemoveAll = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will remove all items from your cart!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, clear all!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Loop through items to remove each one
        cart.forEach((item) => handleRemoveFromCart(item._id));
        refetch();
        Swal.fire(
          "Cleared!",
          "All items have been removed from your cart.",
          "success"
        );
      }
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleRemoveFromCart(id);
        refetch();
        Swal.fire("Deleted!", "Your item has been deleted.", "success");
      }
    });
  };

  return (
    <div>
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

      <div className="flex justify-center md:justify-end mt-10">
        <button
          onClick={handleRemoveAll}
          className="px-4 py-2 bg-red-500 text-white rounded-sm"
        >
          Clear All Items
        </button>
      </div>

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
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={item.image} alt="Item" />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{item.title}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>{item.quantity}</td>
                <th>
                  <button
                    onClick={() => handleDelete(item._id)}
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
