import "./App.css";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import { UserContextProvider } from "./context/userContext";
import { AudioProvider } from "./context/audioContext";

import { Toaster } from "react-hot-toast";

import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import LoadingIndicator from "./components/LoadingIndicator";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const PricingPage = lazy(() => import("./pages/PricingPage"));
const UserBeatsPage = lazy(() => import("./pages/UserBeatsPage"));
const CreateBeatPage = lazy(() => import("./pages/CreateBeatPage"));
const BeatDetailedPage = lazy(() => import("./pages/BeatDetailedPage"));
const BeatEditPage = lazy(() => import("./pages/BeatEditPage"));
const BeatBuyPage = lazy(() => import("./pages/BeatBuyPage"));
const UserDetailedPage = lazy(() => import("./pages/UserDetailedPage"));
const UserEditPage = lazy(() => import("./pages/UserEditPage"));
const QueryPage = lazy(() => import("./pages/QueryPage"));

function App() {
  return (
    <>
      <UserContextProvider>
        <AudioProvider>
          <NavBar />
          <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/login"
              element={
                <Suspense fallback={<LoadingIndicator />}>
                  <LoginPage />
                </Suspense>
              }
            />
            <Route
              path="/signup/:membership"
              element={
                <Suspense fallback={<LoadingIndicator />}>
                  <SignupPage />
                </Suspense>
              }
            />
            <Route
              path="/pricing"
              element={
                <Suspense fallback={<LoadingIndicator />}>
                  <PricingPage />
                </Suspense>
              }
            />
            <Route
              path="/user/beats"
              element={
                <Suspense fallback={<LoadingIndicator />}>
                  <UserBeatsPage />
                </Suspense>
              }
            />
            <Route
              path="/create-beat"
              element={
                <Suspense fallback={<LoadingIndicator />}>
                  <CreateBeatPage />
                </Suspense>
              }
            />
            <Route
              path="/beats/:beatId"
              element={
                <Suspense fallback={<LoadingIndicator />}>
                  <BeatDetailedPage />
                </Suspense>
              }
            />
            <Route
              path="/beats/edit/:beatId"
              element={
                <Suspense fallback={<LoadingIndicator />}>
                  <Suspense fallback={<LoadingIndicator />}>
                    <BeatEditPage />
                  </Suspense>
                </Suspense>
              }
            />
            <Route
              path="/user/detailed/:userId"
              element={
                <Suspense fallback={<LoadingIndicator />}>
                  <UserDetailedPage />
                </Suspense>
              }
            />
            <Route
              path="/user/edit/:userId"
              element={
                <Suspense fallback={<LoadingIndicator />}>
                  <UserEditPage />
                </Suspense>
              }
            />
            <Route
              path="/query/:query"
              element={
                <Suspense fallback={<LoadingIndicator />}>
                  <QueryPage />
                </Suspense>
              }
            />
            <Route
              path="/beats/buy/:beatId"
              element={
                <Suspense fallback={<LoadingIndicator />}>
                  <BeatBuyPage />
                </Suspense>
              }
            />
          </Routes>
        </AudioProvider>
      </UserContextProvider>
    </>
  );
}

export default App;
