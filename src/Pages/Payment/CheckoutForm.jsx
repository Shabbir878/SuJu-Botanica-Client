import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const CheckoutForm = () => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("card");
  const [userEmail, setUserEmail] = useState(""); // State to store user email
  const [userName, setUserName] = useState(""); // State to store user name
  const stripe = useStripe();
  const elements = useElements();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { cart, refetch } = useCart();

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => {
    const price = Number(item.price);
    const quantity = Number(item.quantity);
    return total + (isNaN(price) || isNaN(quantity) ? 0 : price * quantity);
  }, 0);

  console.log("Total Price:", totalPrice);

  useEffect(() => {
    if (totalPrice > 0) {
      console.log("Creating payment intent with total price:", totalPrice);
      // Create payment intent using Axios
      axiosPublic
        .post("/create-payment-intent", {
          price: totalPrice,
        })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        })
        .catch((err) => {
          console.error("Error creating payment intent:", err);
          toast.error("Failed to create payment intent.");
        });
    } else {
      console.log("Invalid total price for payment intent:", totalPrice);
    }
  }, [totalPrice]);

  const handleCheckboxChange = (e) => {
    setChecked(e.target.checked);
  };

  const handleCardSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const card = elements.getElement(CardNumberElement);

    if (card === null) {
      setLoading(false);
      return;
    }

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
      toast.error(`Payment Error: ${error.message}`);
      setLoading(false);
      return;
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: userEmail, // Use the user's email here
            name: userName,
          },
        },
      });

    setLoading(false);

    if (confirmError) {
      setError(confirmError.message);
      toast.error(`Payment Confirmation Error: ${confirmError.message}`);
    } else {
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);

        const payment = {
          name: userName,
          email: userEmail, // Use the user's email here
          price: totalPrice,
          transactionId: paymentIntent.id,
          date: new Date(),
          productIds: cart.map((item) => item._id),
          status: "Success",
        };

        // Post payment using Axios
        axiosPublic
          .post("/payments", payment)
          .then((res) => {
            if (res.data.paymentResult.insertedId) {
              toast.success("Thank you for the payment!");
              refetch();
              navigate("/products/paymentHistory");
            }
          })
          .catch((err) => {
            console.error("Error posting payment:", err);
            toast.error("Failed to process payment.");
          });
      }
    }
  };

  const handleCashOnDeliverySubmit = (event) => {
    event.preventDefault();
    if (!checked) {
      toast.error("Please confirm cash on delivery.");
      return;
    }

    const payment = {
      name: userName, // Use the user's name here
      email: userEmail, // Use the user's email here
      price: totalPrice,
      transactionId: `COD-${Date.now()}`,
      date: new Date(),
      productIds: cart.map((item) => item._id),
      status: "Pending",
    };

    // Post cash on delivery payment using Axios
    axiosPublic
      .post("/payments", payment)
      .then((res) => {
        if (res.data.paymentResult.insertedId) {
          toast.success("Order placed successfully!");
          refetch();
          navigate("/products/paymentHistory");
        }
      })
      .catch((err) => {
        console.error("Error posting payment:", err);
        toast.error("Failed to process cash on delivery.");
      });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto">
        <table className="table w-full bg-green-100">
          <thead>
            <tr>
              <th colSpan={2} className="text-lg font-bold text-center">
                Checkout
              </th>
            </tr>
            <tr>
              <th>Payment Method</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <label className="flex items-center cursor-pointer font-bold">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    className="mr-2"
                    checked={selectedMethod === "card"}
                    onChange={() => setSelectedMethod("card")}
                  />
                  Card
                </label>
              </td>
              <td>
                <form onSubmit={handleCardSubmit} className="space-y-2">
                  <div>
                    <label className="label">Name</label>
                    <input
                      type="text"
                      placeholder="Name"
                      className="input input-bordered w-full"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)} // Update name state
                      required
                    />
                  </div>
                  <div>
                    <label className="label">Email</label>
                    <input
                      type="email"
                      placeholder="Email"
                      className="input input-bordered w-full"
                      value={userEmail} // Bind email state
                      onChange={(e) => setUserEmail(e.target.value)} // Update email state
                      required // Ensure email is required
                    />
                  </div>
                  <div className="my-2">
                    <label className="label">Card Number</label>
                    <CardNumberElement className="border p-2 mt-1" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="label">Expires</label>
                      <CardExpiryElement className="border p-2 rounded-lg" />
                    </div>
                    <div>
                      <label className="label">CVC</label>
                      <CardCvcElement className="border p-2 rounded-lg" />
                    </div>
                  </div>
                  <p className="text-red-600 font-semibold">{error}</p>
                  <button
                    disabled={loading || selectedMethod !== "card"}
                    type="submit"
                    className="btn btn-primary w-full mt-4"
                  >
                    Continue
                  </button>
                </form>
              </td>
            </tr>
            <tr>
              <td>
                <label className="flex items-center cursor-pointer font-bold">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cashOnDelivery"
                    className="mr-2"
                    checked={selectedMethod === "cashOnDelivery"}
                    onChange={() => setSelectedMethod("cashOnDelivery")}
                  />
                  Cash On Delivery
                </label>
              </td>
              <td>
                <form className="space-y-2">
                  <div>
                    <label className="label">Name</label>
                    <input
                      type="text"
                      placeholder="Name"
                      className="input input-bordered w-full"
                      value={userName} // Bind name state
                      onChange={(e) => setUserName(e.target.value)} // Update name state
                      required
                    />
                  </div>
                  <div>
                    <label className="label">Email</label>
                    <input
                      type="email"
                      placeholder="Email"
                      className="input input-bordered w-full"
                      value={userEmail} // Bind email state
                      onChange={(e) => setUserEmail(e.target.value)} // Update email state
                      required
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={handleCheckboxChange}
                      className="mr-2"
                    />
                    <span className="text-gray-600">
                      Confirm cash on delivery
                    </span>
                  </div>
                  <button
                    onClick={handleCashOnDeliverySubmit}
                    disabled={selectedMethod !== "cashOnDelivery" || !checked}
                    className="btn btn-primary w-full mt-4"
                  >
                    Continue
                  </button>
                </form>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CheckoutForm;
