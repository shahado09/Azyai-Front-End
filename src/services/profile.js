import axios from "axios";

// Set the base URL for profile routes
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/profiles`;


// Function to create a new profile
export const create = async (formData) => {
  try {
    const token = localStorage.getItem("token"); // Get token from local storage
    const res = await axios.post(BASE_URL, formData, {
      headers: {
        Authorization: `Bearer ${token}`, // Set authorization header
        "Content-Type": "application/json", // Set content type
      },
    });
    return res.data; // Return the created profile data
  } catch (err) {
    console.error("Error in profile creation service:", err);
    throw err; // Throw error for handling in the calling function
  }
};

// Function to show a profile by ID
export const show = async (id) => {
  try {
    const token = localStorage.getItem("token"); // Get token from local storage
    const res = await axios.get(`${BASE_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` }, // Set authorization header
    });
    return res.data; // Return the profile data
  } catch (err) {
    console.error("Error in profile show service:", err);
    throw err; // Throw error for handling in the calling function
  }
};

// Function to update an existing profile
export const update = async (id, formData) => {
  try {
    const token = localStorage.getItem("token"); // Get token from local storage
    const res = await axios.put(`${BASE_URL}/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`, // Set authorization header
      },
    });
    return res.data; // Return the updated profile data
  } catch (err) {
    console.error("Error in profile update service:", err);
    throw err; // Throw error for handling in the calling function
  }
};

// Function to delete a profile by ID
export const deleteOne = async (id) => {
  try {
    const token = localStorage.getItem("token"); // Get token from local storage
    const res = await axios.delete(`${BASE_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` }, // Set authorization header
    });
    return res.data; // Return success message or data
  } catch (err) {
    console.error("Error in profile delete service:", err);
    throw err; // Throw error for handling in the calling function
  }
};