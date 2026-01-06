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

export { getAllCloth };