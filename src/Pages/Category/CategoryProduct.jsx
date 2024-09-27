import { useParams } from "react-router-dom";
import { useGetProductsByCategoryQuery } from "../../redux/api/api";
import ProductCard from "./ProductCard";
import Loading from "../Shared/Loading/Loading";

const CategoryProducts = () => {
  const { categoryName } = useParams();
  const {
    data: products,
    error,
    isLoading,
  } = useGetProductsByCategoryQuery(categoryName);

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
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Products in {categoryName}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;
