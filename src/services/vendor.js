import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/vendor`;

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
}

async function getLatest() {
  const response = await axios.get(`${BASE_URL}/request/latest`, { headers: getAuthHeaders(),});
  return response.data; 
}

async function createRequest(formData) {
  const response = await axios.post(`${BASE_URL}/request`, formData, {
    headers: {...getAuthHeaders(),"Content-Type": "application/json",},
  });
  return response.data; 
}

export { getLatest, createRequest };
