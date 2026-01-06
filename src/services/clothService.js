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
export { getAllCloth, createCloth };