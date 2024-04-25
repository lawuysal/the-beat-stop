// import { React, Suspense, lazy } from "react";
import React from "react";
import { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./pages/HomePage";
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const PricingPage = lazy(() => import("./pages/PricingPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage></MainPage>,
  },
  {
    path: "pricing/",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <PricingPage />
      </Suspense>
    ),
  },
  {
    path: "login/",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <LoginPage></LoginPage>
      </Suspense>
    ),
  },
  {
    path: "signup/",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <SignupPage></SignupPage>
      </Suspense>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);
