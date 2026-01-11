import axios from "axios";
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/cloth`;

// allCloth 
async function getAllCloth() {
try{
  const response = await axios.get(BASE_URL);
  return response.data; }
  
  catch(error){
    console.log(error)}
}

// create cloth
const createCloth = async (formData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(BASE_URL, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.createdcloth;
  } catch (error) {
    console.log(error);
  }
};

// show cloth

const show = async (clothId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${BASE_URL}/${clothId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.foundCloth;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const update = async (clothId, formData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.put(`${BASE_URL}/${clothId}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.updated;
  } catch (error) {
    console.log(error);
  }
};

const deleteOne = async (clothId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.delete(`${BASE_URL}/${clothId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.message; 
  } catch (error) {
    console.log(error);
  }
};
export { getAllCloth, createCloth,show ,deleteOne, update };