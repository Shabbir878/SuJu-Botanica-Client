import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Create the API with RTK Query
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000", // Adjust this to your actual base URL
  }),
  tagTypes: ["products", "categories", "orders", "cart"],
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
    getAllProductsCategories: builder.query({
      query: (name) => {
        const formattedName = decodeURIComponent(name);
        return {
          method: "GET",
          url: `/products?category=${formattedName}`,
        };
      },
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
          url: "/categories/create-category",
          body: data,
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
      invalidatesTags: ["categories"],
    }),

    // Orders Endpoints
    getOrders: builder.query({
      query: () => ({
        method: "GET",
        url: "/orders",
      }),
      providesTags: ["orders"],
    }),
    addOrder: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/orders/create-order",
          body: data,
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
      invalidatesTags: ["orders"],
    }),

    // Cart Endpoints
    getCart: builder.query({
      query: () => ({
        method: "GET",
        url: "/carts",
      }),
      providesTags: ["cart"],
    }),
    addToCart: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/carts/add",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["cart"],
    }),
    removeFromCart: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `/carts/${id}`,
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
  useGetAllProductsCategoriesQuery,
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useGetOrdersQuery,
  useAddOrderMutation,
  useGetCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
} = baseApi;
