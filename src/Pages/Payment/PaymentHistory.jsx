import { useEffect } from "react";
import { useGetPaymentsQuery } from "../../redux/api/api";
import Loading from "../Shared/Loading/Loading";
import ScrollButton from "../Home/Home/ScrollButton";

const PaymentHistory = () => {
  const { data: payments = [], isLoading, error } = useGetPaymentsQuery();

  // Handle potential errors
  useEffect(() => {
    if (error) {
      console.error("Error fetching payments:", error);
      // You might want to set an error state or notify the user
    }
  }, [error]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl mb-4">Payment History: {payments.length}</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full text-left">
          {/* head */}
          <thead>
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Products</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Transaction ID</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  <Loading />
                </td>
              </tr>
            ) : payments.length > 0 ? (
              payments.map((payment, index) => (
                <tr key={payment._id}>
                  <th className="px-4 py-2">{index + 1}</th>
                  <th className="px-4 py-2">{payment.name}</th>
                  <th className="px-4 py-2">{payment.email}</th>
                  <th className="px-4 py-2">{payment.productIds}</th>
                  <td className="px-4 py-2">${payment.price}</td>
                  <td className="px-4 py-2">{payment.transactionId}</td>
                  <td className="px-4 py-2">{payment.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No payments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ScrollButton />
    </div>
  );
};

export default PaymentHistory;
