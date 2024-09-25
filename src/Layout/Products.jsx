import {
  // FaBook,
  // FaCalendar,
  FaEnvelope,
  FaHome,
  FaShoppingCart,
  FaTree,
  // FaList,
  // FaShoppingCart,
  // FaUser,
  // FaUtensils,
  // FaWallet,
} from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
// import { MdReviews } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";

const Products = () => {
  return (
    <div className="flex">
      {/* Dashboard side bar */}
      <div className="w-64 min-h-screen bg-green-500">
        <ul className="menu p-4">
          <>
            <li>
              <NavLink to="/products/allProducts">
                <FaHome />
                All Products
              </NavLink>
            </li>

            <li>
              <NavLink to="/products/addProduct">
                <FaTree />
                Add Product
              </NavLink>
            </li>

            <li>
              <NavLink to="/products/cart">
                <FaShoppingCart />
                My Cart
              </NavLink>
            </li>
          </>
          {/* shared nav links */}
          <div className="divider"></div>

          <li>
            <NavLink to="/">
              <FaHome />
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/order/salad">
              <GiHamburgerMenu />
              Menu
            </NavLink>
          </li>

          <li>
            <NavLink to="/contact">
              <FaEnvelope />
              Contact
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Dashboard content */}
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Products;

{
  /* <li>
              <NavLink to="/dashboard/manageItems">
                <FaList />
                Manage Items
              </NavLink>
            </li>

            <li>
              <NavLink to="/dashboard/bookings">
                <FaBook />
                Manage Bookings
              </NavLink>
            </li>

            <li>
              <NavLink to="/dashboard/users">
                <FaUser />
                All Users
              </NavLink>
            </li>
          </>

          <>
            <li>
              <NavLink to="/dashboard/userHome">
                <FaHome />
                User Home
              </NavLink>
            </li>

            <li>
              <NavLink to="/dashboard/reservation">
                <FaCalendar />
                Reservation
              </NavLink>
            </li>

            <li>
              <NavLink to="/dashboard/paymentHistory">
                <FaWallet />
                Payment History
              </NavLink>
            </li>

            <li>
              <NavLink to="/dashboard/cart">
                <FaShoppingCart />
                My Cart
              </NavLink>
            </li>

            <li>
              <NavLink to="/dashboard/review">
                <MdReviews />
                Add Review
              </NavLink>
            </li>

            <li>
              <NavLink to="/dashboard/bookings">
                <FaList />
                My Booking
              </NavLink>
            </li>
          </> */
}
