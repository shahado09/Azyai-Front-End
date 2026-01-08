import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/admin`;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};

export const getRequests = async () => {
  const response = await axios.get(`${BASE_URL}/vendor-requests`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const approveRequest = async (id) => {
  const response = await axios.put(
    `${BASE_URL}/vendor-requests/${id}/approve`,
    {},
    { headers: getAuthHeaders() }
  );
  return response.data;
};

export const rejectRequest = async (id, adminNote) => {
  const response = await axios.put(
    `${BASE_URL}/vendor-requests/${id}/reject`,
    { adminNote },
    { headers: getAuthHeaders() }
  );
  return response.data;
};