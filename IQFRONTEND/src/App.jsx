import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import VideoBG from "./components/VideoBG";
import HomePage from "./views/HomePage";
import Footer from "./components/Footer";
import "./App.css";
import Services from "./views/Services";
import Login from "./views/Login";
import Signup from "./views/Signup";
import UserProfile from "./views/UserProfile";
import AdminProfile from "./views/AdminProfile";
import Messages from "./views/Messages";
import ProtectedRoute from "./components/ProtectedRoute";
import BookPlayer from "./views/BookPlayer";
import EditUserProfile from "./views/EditUserProfile";
import PlayerSignup from "./views/PlayerSignUp";
import ForgotPassword from "./views/ForgotPassword";
import ResetPassword from "./views/ResetPassword";
import AboutUs from "./views/AboutUs";
import ContactUs from "./views/ContactUs";
import PrivacyPolicy from "./views/PrivacyPolicy";
import FAQ from "./views/FAQ";   
import Leaderboard from "./views/Leaderboard";
import Careers from "./views/Careers";

const AdminOnly = ({ children }) => {
  const role = (localStorage.getItem("role") || "").toLowerCase();
  return role === "admin" ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <>
      <VideoBG src="/home.mp4" />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/Leaderboard" element={<Leaderboard />} />
          <Route path="/careers" element={<Careers />} />
          
          <Route
            path="/bookplayer"
            element={
              <ProtectedRoute>
                <BookPlayer />
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/editprofile" element={<EditUserProfile />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/player/profile"
            element={<Navigate to="/profile" replace />}
          />

          <Route
            path="/admin/profile"
            element={
              <ProtectedRoute>
                <AdminOnly>
                  <AdminProfile />
                </AdminOnly>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/players/new"
            element={
              <ProtectedRoute>
                <AdminOnly>
                  <PlayerSignup />
                </AdminOnly>
              </ProtectedRoute>
            }
          />

          <Route
            path="/messages"
            element={
              <ProtectedRoute>
                <Messages />
              </ProtectedRoute>
            }
          />
        </Routes>

        <Footer />
      </main>

      <ToastContainer
        position="top-right"
        autoClose={1600}
        pauseOnFocusLoss={false}
        newestOnTop
        theme="dark"
        closeOnClick
      />
    </>
  );
};

export default App;
