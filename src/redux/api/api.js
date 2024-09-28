import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Create the API with RTK Query
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000", // Adjust this to your actual base URL
  }),
  tagTypes: ["products", "categories", "payment", "cart", "reviews"],
  endpoints: (builder) => ({
    // Products Endpoints
    getProducts: builder.query({
      query: () => ({
        method: "GET",
        url: "/allProducts",
      }),
      providesTags: ["products"],
    }),
    addProduct: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/products/addProduct",
          body: data,
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
      invalidatesTags: ["products"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        method: "PATCH",
        url: `/products/${id}`,
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["products"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `/products/${id}`,
      }),
      invalidatesTags: ["products"],
    }),
    getASingleProduct: builder.query({
      query: ({ id }) => ({
        method: "GET",
        url: `/products/${id}`,
      }),
      providesTags: ["products"],
    }),
    // Fetch products by category
    getProductsByCategory: builder.query({
      query: (categoryName) => ({
        method: "GET",
        url: `/products/categories/${encodeURIComponent(categoryName)}`,
      }),
      providesTags: ["products", "categories"],
    }),

    // Categories Endpoints
    getCategories: builder.query({
      query: () => ({
        method: "GET",
        url: "/categories",
      }),
      providesTags: ["categories"],
    }),
    addCategory: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/categories/addCategory",
          body: data,
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
      invalidatesTags: ["categories"],
    }),

    getPayments: builder.query({
      query: () => ({
        url: "/payments",
        method: "GET",
      }),
      providesTags: ["payment"],
    }),

    //reviews
    getReviews: builder.query({
      query: () => ({
        method: "GET",
        url: "/reviews", // Your actual reviews endpoint
      }),
      providesTags: ["reviews"],
    }),

    // Cart Endpoints
    getCart: builder.query({
      query: () => ({
        url: "/carts",
        method: "GET",
      }),
      providesTags: ["cart"],
    }),
    addToCart: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/carts", // Ensure this matches your backend endpoint
        body: data, // This should include the product's ObjectId
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["cart"],
    }),
    updateCartItemQuantity: builder.mutation({
      query: ({ id, quantity }) => ({
        url: `/carts/${id}`, // Ensure this is your backend endpoint
        method: "PATCH",
        body: { quantity }, // Pass the new quantity to update
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["cart"], // Ensure cart is refetched
    }),

    removeFromCart: builder.mutation({
      query: (id) => ({
        url: `/carts/${id}`, // Ensure id is a MongoDB ObjectId
        method: "DELETE",
      }),
      invalidatesTags: ["cart"],
    }),
  }),
});

// Export hooks for using the queries and mutations in components
export const {
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetASingleProductQuery,
  useGetProductsByCategoryQuery,
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useGetPaymentsQuery,
  useGetCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useUpdateCartItemQuantityMutation,
  useGetReviewsQuery,
} = baseApi;
