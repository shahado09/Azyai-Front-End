import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/auth`;


async function signUp(formData) {
  try {
    const response = await axios.post(`${BASE_URL}/sign-up`, formData);
    const { token, profileId } = response.data;

    localStorage.setItem("token", token);

    let user = null;
    try {
      const tokenParts = token.split(".");
      if (tokenParts.length === 3) {
        const encodedPayload = tokenParts[1];
        const decodedPayload = window.atob(encodedPayload);
        const parsedPayload = JSON.parse(decodedPayload);
        user = parsedPayload; 
      }
    } catch (err) {
      console.error("Invalid token format:", err);
    }

    
    return { token, profileId, user };
  } catch (err) {
    console.error("Error signing up:", err);
    throw err;
  }
}


async function signIn(formData) {
  try {
    const response = await axios.post(`${BASE_URL}/sign-in`, formData);
    const { token, profileId } = response.data;

   
    localStorage.setItem("token", token);

    let user = null;
    try {
      const tokenParts = token.split(".");
      if (tokenParts.length === 3) {
        const encodedPayload = tokenParts[1];
        const decodedPayload = window.atob(encodedPayload);
        const parsedPayload = JSON.parse(decodedPayload);
        user = parsedPayload; 
      }
    } catch (err) {
      console.error("Invalid token format:", err);
    }

    
    return { token, profileId, user };
  } catch (err) {
    console.error("Error signing in:", err);
    throw err;
  }
}

export { signUp, signIn };
