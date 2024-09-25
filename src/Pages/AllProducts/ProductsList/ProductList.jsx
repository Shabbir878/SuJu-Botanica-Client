import { Link, useNavigate } from "react-router-dom";
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
import { useState } from "react";
import Swal from "sweetalert2";
import { toast } from "sonner";
import useCart from "../../../hooks/useCart"; // Import your custom cart hook

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

  // Use the custom cart hook
  const { handleAddToCart } = useCart();
  const navigate = useNavigate();

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

  // Function to handle adding a product to the cart
  const addToCartHandler = (item) => {
    handleAddToCart({
      productId: item._id,
      title: item.title,
      price: item.price,
      quantity: 1,
      image: item.image,
    });

    // Navigate to cart after adding the item
    navigate("/products/cart");
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something went wrong: {error.message}</p>;
  }

  return (
    <div>
      <SectionTitle heading="Products" subHeading="Helps to heal life" />
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
              {data && data.length > 0 ? (
                data.map((item, index) => (
                  <tr key={item._id}>
                    <td className="text-center">{index + 1}</td>
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
                        <button className="btn btn-ghost bg-blue-500">
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
                        className="btn btn-ghost btn-lg"
                        onClick={() => handleEdit(item)}
                      >
                        <FaEdit className="text-green-500 text-2xl" />
                      </button>
                    </td>
                    <td className="text-center">
                      <button
                        className="btn btn-ghost btn-lg"
                        onClick={() => handleDelete(item._id)}
                      >
                        <FaTrashAlt className="text-red-600 text-2xl" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="text-center">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
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
    </div>
  );
};

export default ProductList;
