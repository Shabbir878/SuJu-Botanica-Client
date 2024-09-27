import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { useAddCategoryMutation } from "../../redux/api/api";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddCategory = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [addCategory] = useAddCategoryMutation(); // Use mutation for adding a category
  const navigate = useNavigate();

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
      // Now send the category data to the server with the image url
      const categoryData = {
        category: data.categoryName,
        description: data.description,
        image: resData.data.display_url,
      };

      // Use the addCategory mutation to add the category
      const categoryRes = await addCategory(categoryData);

      // Check if category was added successfully
      if (categoryRes?.data?.insertedId) {
        reset();
        toast.success(`Category ${data.categoryName} added successfully!`, {
          position: "top-right",
          autoClose: 2000,
        });
        navigate("/categoryList/categories"); // Navigate back to category list
      } else {
        // Handle error case if category was not added
        toast.error("Failed to add the category.", {
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
    <div className="max-w-3xl mx-auto p-4">
      <SectionTitle heading="Add a Category" subHeading="Create New Category" />
      <div className="bg-green-50 p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Category Name*</span>
            </label>
            <input
              type="text"
              placeholder="Category Name"
              {...register("categoryName", { required: true })}
              className="input input-bordered w-full"
            />
            {errors.categoryName && (
              <p className="text-red-600">Category Name is required</p>
            )}
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

          <button
            type="submit"
            className="btn btn-outline font-bold bg-slate-100 border-green-400 border-0 border-b-4 w-full"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
