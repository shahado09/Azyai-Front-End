import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SignInForm/SignInForm";
import Landing from "./components/Landing/Landing";
import Dashboard from "./components/Dashboard/Dashboard";

import ProfileShow from "./pages/ProfileShow/ProfileShow";
import ProfileEdit from "./pages/ProfileEdit/ProfileEdit";
import ProfileCreate from "./pages/ProfileCreate/ProfileCreate";

import { UserContext } from "./contexts/UserContext";

const App = () => {
  const { user } = useContext(UserContext); // Get user information from UserContext

  return (
    <div className="page">
      <NavBar /> {/* Render navigation bar */}
      <div className="page-content">
        <Routes>
          <Route path="/" element={user ? <Dashboard /> : <Landing />} /> {/* Redirect based on user status */}
          <Route path="/sign-up" element={<SignUpForm />} /> {/* Sign-up route */}
          <Route path="/sign-in" element={<SignInForm />} /> {/* Sign-in route */}
          <Route
            path="/profile/create"
            element={user ? <ProfileCreate /> : <Navigate to="/sign-in" replace />} // Redirect to sign-in if no user
          />
          <Route
            path="/profile/:id"
            element={user ? <ProfileShow /> : <Navigate to="/sign-in" replace />} // Redirect to sign-in if no user
          />
          <Route
            path="/profile/:id/edit"
            element={user ? <ProfileEdit /> : <Navigate to="/sign-in" replace />} // Redirect to sign-in if no user
          />
          {/* Optional: direct route to current user's profile */}
          {user?.profileId && (
            <Route
              path="/my-profile"
              element={<Navigate to={`/profile/${user.profileId}`} replace />} // Redirect to user's profile
            />
          )}
        </Routes>
      </div>
    </div>
  );
};

export default App;