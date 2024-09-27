import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useGetCategoriesQuery } from "../../redux/api/api";
import Loading from "../Shared/Loading/Loading";
import ScrollButton from "../Home/Home/ScrollButton";

const Category = () => {
  const { data: categories = [], isLoading, error } = useGetCategoriesQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen mt-10">
        <Loading />
      </div>
    );
  }

  if (error) {
    return <p>Something went wrong: {error.message}</p>;
  }

  // Check if categories array is empty
  if (categories.length === 0) {
    return <p className="text-center mt-10">No categories available.</p>;
  }

  // Filter categories based on search term
  const filteredCategories = categories.filter((category) =>
    category.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="px-4 md:px-8 lg:px-16">
      <Helmet>
        <title>SuJu Botanica | Category</title>
      </Helmet>
      <h1 className="text-3xl text-green-800 text-center p-5 font-bold">
        Categories
      </h1>

      {/* Search Input and Add Category Button */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-5 space-y-4 md:space-y-0">
        <input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded px-4 py-2 w-full md:max-w-sm"
        />
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors w-full md:w-auto"
          onClick={() => navigate("/categoryList/addCategory")}
        >
          Add Category
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ">
        {filteredCategories.map((category) => (
          <div
            key={category._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col justify-between"
          >
            <img
              src={category.image}
              alt={category.category}
              className="w-full h-48 object-cover"
            />
            <div className="p-5 text-center flex flex-col items-center">
              <h2 className="text-xl font-bold mb-2 text-green-800">
                {category.category}
              </h2>
              <p className="text-gray-700 mb-4">{category.description}</p>
              <Link
                to={`/products/categories/${encodeURIComponent(
                  category.category
                )}`}
              >
                <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors w-full">
                  View Products
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <ScrollButton />
    </div>
  );
};

export default Category;
