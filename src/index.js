import React from "react";
import ReactDOM from "react-dom/client";
import RootLayout from "./pages/RootLayout";
import Signup from "./pages/Signup";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "signup",
        element: <Signup />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);

reportWebVitals();
