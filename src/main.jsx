import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import App from "./App.jsx"; // If you have an App component, you can include it.
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes.jsx";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <div className="max-w-screen-xl mx-auto p-4">
          <RouterProvider router={router} />
        </div>
      </HelmetProvider>
      <ToastContainer />
    </Provider>
  </StrictMode>
);
