import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { FaTree } from "react-icons/fa";
import { toast } from "react-toastify"; // Import toast
import { useAddProductMutation } from "../../../redux/api/api";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [addProduct] = useAddProductMutation();
  const navigate = useNavigate(); // Initialize useNavigate

  const onSubmit = async (data) => {
    // Image upload to imgbb & then get an url
    const formData = new FormData();
    formData.append("image", data.image[0]);

    const response = await fetch(image_hosting_api, {
      method: "POST",
      body: formData,
    });

    const resData = await response.json();

    if (resData.success) {
      // Now send the product data to the server with the image url
      const productData = {
        title: data.title,
        description: data.description,
        price: parseFloat(data.price),
        quantity: parseInt(data.quantity),
        rating: parseFloat(data.rating),
        category: data.category,
        image: resData.data.display_url,
      };

      // Use the addProduct mutation to add the item
      const productRes = await addProduct(productData);
      console.log(productRes);

      // Check if product was added successfully
      if (productRes?.data?.insertedId) {
        reset();
        // Show success toast notification
        toast.success(`${data.title} has been added successfully!`, {
          position: "top-right",
          autoClose: 2000,
        });

        // Navigate to /allProduct
        navigate("/products/allProducts");
      } else {
        // Handle error case if product was not added
        toast.error("Failed to add the product.", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    } else {
      toast.error("Image upload failed.", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <SectionTitle heading="Add an Item" subHeading="What's New?" />
      <div className="bg-green-50 p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Title*</span>
            </label>
            <input
              type="text"
              placeholder="Title"
              {...register("title", { required: true })}
              className="input input-bordered w-full"
            />
            {errors.title && <p className="text-red-600">Title is required</p>}
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Description*</span>
            </label>
            <input
              type="text"
              placeholder="Description"
              {...register("description", { required: true })}
              className="input input-bordered w-full"
            />
            {errors.description && (
              <p className="text-red-600">Description is required</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Price */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Price*</span>
              </label>
              <input
                type="number"
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
              <label className="label">
                <span className="label-text">Quantity*</span>
              </label>
              <input
                type="number"
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
              <label className="label">
                <span className="label-text">Rating*</span>
              </label>
              <input
                type="number"
                placeholder="Rating"
                {...register("rating", { required: true })}
                className="input input-bordered w-full"
              />
              {errors.rating && (
                <p className="text-red-600">Rating is required</p>
              )}
            </div>
          </div>

          {/* Category */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Category*</span>
            </label>
            <select
              defaultValue="default"
              {...register("category", { required: true })}
              className="select select-bordered w-full"
            >
              <option disabled value="default">
                Select a category
              </option>
              <option value="indoor plant">Indoor Plant</option>
              <option value="home decor plant">Home Decor Plant</option>
              <option value="gift plant">Gift Plant</option>
              <option value="office decor plant">Office Decor Plant</option>
              <option value="decor plant">Decor Plant</option>
              <option value="garden plant">Garden Plant</option>
            </select>
            {errors.category && (
              <p className="text-red-600">Category is required</p>
            )}
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Upload Image*</span>
            </label>
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input w-full max-w-xs"
            />
            {errors.image && <p className="text-red-600">Image is required</p>}
          </div>

          <button className="btn btn-outline font-bold bg-slate-100 border-green-400 border-0 border-b-4 w-full">
            ADD PRODUCT <FaTree />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
