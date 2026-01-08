import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

const UserContext = createContext();

// Function to extract user information from the JWT token
const getUserFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwt_decode(token);
    return {
      _id: decoded._id || decoded.id,
      username: decoded.username || "",
      email: decoded.email || "",
      profileId: decoded.profileId || null,
      token,
    };
  } catch (err) {
    console.error("Error decoding token:", err);
    return null;
  }
};

const UserProvider = ({ children }) => {
  // State to hold the user data
  const [user, setUser] = useState(getUserFromToken());

  useEffect(() => {
    // Update user state when local storage changes
    const handleStorageChange = () => setUser(getUserFromToken());
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Function to log out the user
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("profileId");
    setUser(null); // Reset user state
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children} {/* Render child components */}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };