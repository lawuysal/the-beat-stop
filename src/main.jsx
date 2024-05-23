import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoadingIndicator from "./components/LoadingIndicator";
import "./main.css";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const PricingPage = lazy(() => import("./pages/PricingPage"));
const UserBeatsPage = lazy(() => import("./pages/UserBeatsPage"));
const CreateBeatPage = lazy(() => import("./pages/CreateBeatPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage></HomePage>,
  },
  {
    path: "pricing/",
    element: (
      <Suspense fallback={<LoadingIndicator />}>
        <PricingPage />
      </Suspense>
    ),
  },
  {
    path: "login/",
    element: (
      <Suspense fallback={<LoadingIndicator />}>
        <LoginPage></LoginPage>
      </Suspense>
    ),
  },
  {
    path: "signup/:membership",
    element: (
      <Suspense fallback={<LoadingIndicator />}>
        <SignupPage></SignupPage>
      </Suspense>
    ),
  },
  {
    path: "user/beats",
    element: (
      <Suspense fallback={<LoadingIndicator />}>
        <UserBeatsPage></UserBeatsPage>
      </Suspense>
    ),
  },
  {
    path: "create-beat",
    element: (
      <Suspense fallback={<LoadingIndicator />}>
        <CreateBeatPage></CreateBeatPage>
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
