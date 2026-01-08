import axios from "axios";

// Set the base URL for authentication routes
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/auth`;

// Sign-up function to create a new user
const signUp = async (formData) => {
  const res = await axios.post(`${BASE_URL}/sign-up`, formData); // Make POST request to sign-up
  const { token, user } = res.data; // Destructure token and user from response

  // Store token and user information in local storage
  localStorage.setItem("token", token);
  localStorage.setItem("userId", user._id);
  localStorage.setItem("profileId", user.profileId);

  return { token, user }; // Return token and user data
};

// Sign-in function to log in an existing user
const signIn = async (formData) => {
  const res = await axios.post(`${BASE_URL}/sign-in`, formData); // Make POST request to sign-in
  const { token, user } = res.data; // Destructure token and user from response

  // Store token and user information in local storage
  localStorage.setItem("token", token);
  localStorage.setItem("userId", user._id);
  localStorage.setItem("profileId", user.profileId);

  return { token, user }; // Return token and user data
};

export { signUp, signIn }; // Export signUp and signIn functions