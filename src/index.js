import React from "react";
import ReactDOM from "react-dom/client";
import RootLayout from "./pages/RootLayout";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import { UserProvider } from "./firebase/UserProvider";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Feature from "./pages/Feature";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "login",
        element: <LogIn />,
      },
      {
        path: "feature",
        element: <Feature />,
      },
      {
        path: "profile/:id",
        element: <Profile />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserProvider>
    <RouterProvider router={router} />
  </UserProvider>
);

reportWebVitals();
