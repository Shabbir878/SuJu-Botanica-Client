import { FaHome, FaTree } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink, Outlet } from "react-router-dom";

const CategoryList = () => {
  return (
    <div className="flex">
      {/* Dashboard side bar */}
      <div className="w-64 min-h-screen bg-green-100">
        <ul className="menu p-4">
          <>
            <li>
              <NavLink to="/categoryList/categories">
                <FaHome />
                All Category
              </NavLink>
            </li>

            <li>
              <NavLink to="/categoryList/addCategory">
                <FaTree />
                Add Category
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
            <NavLink to="/products/allProducts">
              <GiHamburgerMenu />
              Products
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

export default CategoryList;
