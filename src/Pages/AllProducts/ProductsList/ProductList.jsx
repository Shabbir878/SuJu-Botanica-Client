import { Link } from "react-router-dom";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import {
  useGetProductsQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "../../../redux/api/api";
import {
  FaEdit,
  FaTrashAlt,
  FaInfoCircle,
  FaShoppingCart,
} from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { toast } from "sonner";
import useCart from "../../../hooks/useCart";
import { Helmet } from "react-helmet-async";
import Loading from "../../Shared/Loading/Loading";
import ScrollButton from "../../Home/Home/ScrollButton";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const ProductList = () => {
  const { data, isLoading, error } = useGetProductsQuery();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    description: "",
    price: "",
    quantity: "",
    rating: "",
    category: "",
    image: "",
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [isModalOpen, setModalOpen] = useState(false);

  // Pagination, searching, and filtering states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Change this to show more items per page
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryQuery, setCategoryQuery] = useState(""); // New category search
  const [sortCriteria, setSortCriteria] = useState("title"); // Default sorting by title
  const [filteredData, setFilteredData] = useState([]);

  // Use the custom cart hook
  const { handleAddToCart } = useCart();

  // Handle search and sorting effects
  useEffect(() => {
    if (data) {
      let filtered = data.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          item.category.toLowerCase().includes(categoryQuery.toLowerCase()) // Category filtering
      );
      filtered.sort((a, b) => (a[sortCriteria] > b[sortCriteria] ? 1 : -1));
      setFilteredData(filtered);
    }
  }, [data, searchQuery, categoryQuery, sortCriteria]);

  // Handle form default values based on selected product
  useEffect(() => {
    if (selectedProductId) {
      const selectedProduct = data.find(
        (product) => product._id === selectedProductId
      );
      if (selectedProduct) {
        reset({
          title: selectedProduct.title,
          description: selectedProduct.description,
          price: selectedProduct.price,
          quantity: selectedProduct.quantity,
          rating: selectedProduct.rating,
          category: selectedProduct.category,
          image: selectedProduct.image,
        });
      }
    }
  }, [selectedProductId, data, reset]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handleEdit = (item) => {
    setSelectedProductId(item._id);
    setEditFormData({
      title: item.title,
      description: item.description,
      price: item.price,
      quantity: item.quantity,
      rating: item.rating,
      category: item.category,
      image: item.image,
    });
    setModalOpen(true);
  };

  const handleUpdate = async (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);

    const response = await fetch(image_hosting_api, {
      method: "POST",
      body: formData,
    });
    const resData = await response.json();

    if (resData.success) {
      const productData = {
        title: data.title,
        description: data.description,
        price: parseFloat(data.price),
        quantity: parseInt(data.quantity),
        rating: parseFloat(data.rating),
        category: data.category,
        image: resData.data.display_url,
      };

      await updateProduct({ id: selectedProductId, data: productData });
      toast.success("Product updated successfully");
      setModalOpen(false);
      reset();
    }
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
        deleteProduct(id).unwrap();
        toast.success("Product deleted successfully");
      }
    });
  };

  // Add to cart and reduce quantity
  const addToCartHandler = async (product) => {
    if (product.quantity > 0) {
      // Check if the product is in stock
      try {
        console.log("Attempting to add product to cart: ", product);

        // Call handleAddToCart from the useCart hook
        await handleAddToCart(product);

        toast.success(`${product.title} added to cart`);
      } catch (error) {
        // Handle any error during the operation
        toast.error("An error occurred while adding to cart");
        console.error("Error during add to cart operation: ", error);
      }
    } else {
      // If product is out of stock, show an error message
      toast.error(`${product.title} is out of stock`);
    }
  };

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

  return (
    <div>
      <Helmet>
        <title>SuJu Botanica | All Products</title>
      </Helmet>
      <SectionTitle heading="Products" subHeading="Helps to heal life" />

      {/* Search and Sort */}
      <div className="mb-4 flex flex-col md:flex-row justify-between items-center">
        <input
          type="text"
          placeholder="Search products..."
          className="input input-bordered w-full max-w-xs mb-2 md:mb-0"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by category..."
          className="input input-bordered w-full max-w-xs mb-2 md:mb-0"
          value={categoryQuery}
          onChange={(e) => setCategoryQuery(e.target.value)}
        />
        <select
          className="select select-bordered ml-2"
          value={sortCriteria}
          onChange={(e) => setSortCriteria(e.target.value)}
        >
          <option value="title">Title</option>
          <option value="price">Price</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      <div>
        <div className="overflow-x-auto">
          <table className="table w-full table-auto">
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>Rating</th>
                <th>Details</th>
                <th>Cart</th>
                <th>Price</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {currentItems && currentItems.length > 0 ? (
                currentItems.map((item, index) => (
                  <tr key={item._id}>
                    <td className="text-center">
                      {index + 1 + (currentPage - 1) * itemsPerPage}
                    </td>
                    <td>
                      <div className="flex items-center justify-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-16 w-16 md:h-20 md:w-20">
                            <img src={item.image} alt={item.title} />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="text-center">{item.title}</td>
                    <td className="text-center">{item.category}</td>
                    <td className="text-center">{item.rating}</td>
                    <td className="text-center">
                      <Link to={`/products/details/${item._id}`}>
                        <button className="btn btn-ghost bg-blue-500 text-sm">
                          <FaInfoCircle className="text-white" />
                        </button>
                      </Link>
                    </td>
                    <td className="text-center">
                      <button onClick={() => addToCartHandler(item)}>
                        <FaShoppingCart className="text-2xl text-green-500" />
                      </button>
                    </td>
                    <td className="text-center">${item.price}</td>
                    <td className="text-center">
                      <button
                        onClick={() => handleEdit(item)}
                        className="btn btn-warning text-sm"
                      >
                        <FaEdit className="text-white" />
                      </button>
                    </td>
                    <td className="text-center">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="btn btn-error"
                      >
                        <FaTrashAlt className="text-white" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11" className="text-center">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pagination mt-4 flex justify-center">
          {Array.from({
            length: Math.ceil(filteredData.length / itemsPerPage),
          }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`btn ${
                currentPage === i + 1 ? "btn-primary" : "btn-ghost"
              } mx-1`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box bg-green-50">
            <h2 className="font-bold text-lg text-center">Edit Product</h2>
            <form onSubmit={handleSubmit(handleUpdate)}>
              <div className="form-control w-full my-6">
                <div className="label">
                  <span className="label-text">Title*</span>
                </div>
                <input
                  type="text"
                  defaultValue={editFormData.title}
                  placeholder="Title"
                  {...register("title", { required: true })}
                  className="input input-bordered w-full"
                />
                {errors.title && (
                  <p className="text-red-600">Title is required</p>
                )}
              </div>

              <div className="form-control w-full my-6">
                <div className="label">
                  <span className="label-text">Description*</span>
                </div>
                <input
                  type="text"
                  defaultValue={editFormData.description}
                  placeholder="Description"
                  {...register("description", { required: true })}
                  className="input input-bordered w-full"
                />
                {errors.description && (
                  <p className="text-red-600">Description is required</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Price */}
                <div className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Price*</span>
                  </div>
                  <input
                    type="number"
                    defaultValue={editFormData.price}
                    placeholder="Price"
                    {...register("price", { required: true })}
                    className="input input-bordered w-full"
                  />
                  {errors.price && (
                    <p className="text-red-600">Price is required</p>
                  )}
                </div>

                {/* Quantity */}
                <div className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Quantity*</span>
                  </div>
                  <input
                    type="number"
                    defaultValue={editFormData.quantity}
                    placeholder="Quantity"
                    {...register("quantity", { required: true })}
                    className="input input-bordered w-full"
                  />
                  {errors.quantity && (
                    <p className="text-red-600">Quantity is required</p>
                  )}
                </div>

                {/* Rating */}
                <div className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Rating*</span>
                  </div>
                  <input
                    type="number"
                    defaultValue={editFormData.rating}
                    placeholder="Rating"
                    {...register("rating", { required: true })}
                    className="input input-bordered w-full"
                  />
                  {errors.rating && (
                    <p className="text-red-600">Rating is required</p>
                  )}
                </div>
              </div>

              <div className="form-control w-full my-6">
                <div className="label">
                  <span className="label-text">Category*</span>
                </div>
                <input
                  type="text"
                  defaultValue={editFormData.category}
                  placeholder="Category"
                  {...register("category", { required: true })}
                  className="input input-bordered w-full"
                />
                {errors.category && (
                  <p className="text-red-600">Category is required</p>
                )}
              </div>

              <div className="form-control w-full my-6">
                <div className="label">
                  <span className="label-text">Image*</span>
                </div>
                <input
                  type="file"
                  {...register("image", { required: true })}
                  className="file-input file-input-bordered w-full"
                />
                {errors.image && (
                  <p className="text-red-600">Image is required</p>
                )}
              </div>
              <div className="modal-action">
                <button
                  type="button"
                  className="btn"
                  onClick={() => setModalOpen(false)}
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ScrollButton />
    </div>
  );
};

export default ProductList;
