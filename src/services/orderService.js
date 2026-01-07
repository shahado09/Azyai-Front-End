import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/orders`;

async function getMyOrders(token) {
  try {
    const response = await axios.get(BASE_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

const createOrder = async (orderData, token) => {
  try {
    const response = await axios.post(BASE_URL, orderData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const updateOrder = async (orderData, token) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/${orderData._id}`,
      orderData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { getMyOrders, createOrder, updateOrder };
