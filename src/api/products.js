import axios from "axios";

const API_URL = "http://localhost:1226";

export const fetchProducts = async () => {
  const response = await axios.get(API_URL + "/products");
  return response.data;
};

export const getProduct = async (id) => {
  const response = await axios.get(API_URL + "/products/" + id);
  return response.data;
};

export const addProduct = async (data) => {
  const response = await axios({
    method: "POST",
    url: API_URL + "/products",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  });
  return response.data;
};

export const updateProduct = async ({ id, data }) => {
  const response = await axios({
    method: "PUT",
    url: API_URL + "/products/" + id,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  });
  return response.data;
};

export const deleteProduct = async (product_id = "") => {
  const response = await axios({
    method: "DELETE",
    url: API_URL + "/products/" + product_id,
  });
  return response.data;
};