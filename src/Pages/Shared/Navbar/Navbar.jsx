import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import logo from "../../../assets/suju.png";
import useCart from "../../../hooks/useCart";

const Navbar = () => {
  // Destructure cart from the useCart hook
  const { cart } = useCart(); // Correct way to destructure

  const navOptions = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/products/allProducts">Products</Link>
      </li>
      <li>
        <Link to="/categoryList/categories">Categories</Link>
      </li>
    </>
  );

  return (
    <div className="navbar bg-opacity-80 text-green-500 font-bold">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {navOptions}
          </ul>
        </div>
        <div className="avatar">
          <div className="h-20 w-20">
            <img src={logo} alt="Avatar Tailwind CSS Component" />
          </div>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navOptions}</ul>
      </div>
      <div className="navbar-end">
        <Link to="/products/cart">
          <button className="btn">
            <FaShoppingCart className="mr-2" />
            <div className="badge badge-accent">+{cart.length}</div>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
