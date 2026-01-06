import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/profiles`;


const index = async (token) => {
  try {
    const response = await axios.get(BASE_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.profiles;
  } catch (error) {
    console.log(error);
  }
};


const show = async (id, token) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};


const create = async (formData, token) => {
  try {
    const response = await axios.post(BASE_URL, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};


const update = async (profileId, formData, token) => {
  try {
    const response = await axios.put(`${BASE_URL}/${profileId}`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// حذف بروفايل
const deleteOne = async (profileId, token) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${profileId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export {
  index,
  show,
  create,
  update,
  deleteOne
};
