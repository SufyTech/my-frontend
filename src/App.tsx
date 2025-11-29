import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import DashboardWrapper from "./pages/Dashboard";
import { WelcomeScreen } from "./components/WelcomeScreen";
import Review from "./pages/Review";
import HistoryPage from "./pages/HistoryPage";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import { Toaster } from "react-hot-toast";
import OAuthSuccess from "./pages/OAuthSuccess";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Loader from "./components/Loader";
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

const App: React.FC = () => {
  const [showWelcome, setShowWelcome] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const firstTime = localStorage.getItem("firstTimeUser");

    if (token && !firstTime) {
      setShowWelcome(true);
      localStorage.setItem("firstTimeUser", "true");
    }

    // Force minimum loader time
    const minTime = 3500; // 1.5 seconds
    const start = Date.now();

    const finishLoading = () => setLoading(false);
    const elapsed = Date.now() - start;

    if (elapsed < minTime) {
      setTimeout(finishLoading, minTime - elapsed);
    } else {
      finishLoading();
    }
  }, []);

  if (loading)
    return (
      <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-900">
        <Loader />
      </div>
    );

  return (
    <>
      {showWelcome && (
        <WelcomeScreen
          onStartReview={() => setShowWelcome(false)}
          onGoToDashboard={() => setShowWelcome(false)}
        />
      )}

      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            localStorage.getItem("token") ? (
              <Navigate to="/dashboard" />
            ) : (
              <Home />
            )
          }
        />
        <Route
          path="/login"
          element={
            localStorage.getItem("token") ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/signup"
          element={
            localStorage.getItem("token") ? (
              <Navigate to="/dashboard" />
            ) : (
              <Signup />
            )
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/oauth-success" element={<OAuthSuccess />} />

        {/* Protected Routes WITHOUT ProtectedLayout */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardWrapper />
            </PrivateRoute>
          }
        />
        <Route
          path="/review"
          element={
            <PrivateRoute>
              <Review />
            </PrivateRoute>
          }
        />
        <Route
          path="/history"
          element={
            <PrivateRoute>
              <HistoryPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Toaster position="top-center" />
    </>
  );
};

export default App;
