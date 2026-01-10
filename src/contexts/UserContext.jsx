import { createContext, useState, useEffect } from "react";

const UserContext = createContext();

const getUserFromStorage = () => {
  const stored = localStorage.getItem("user");
  if (!stored) return null;

  try {
    return JSON.parse(stored);
  } catch {
    localStorage.removeItem("user");
    return null;
  }
};

const UserProvider = ({ children }) => {
  const [user, setUserState] = useState(() => getUserFromStorage());

  const setUser = (userData) => {
    setUserState(userData);
    if (userData) localStorage.setItem("user", JSON.stringify(userData));
    else localStorage.removeItem("user");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("profileId");
    setUserState(null);
  };


  useEffect(() => {
    const onStorage = () => setUserState(getUserFromStorage());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };