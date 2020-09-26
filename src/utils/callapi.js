import { API_URL } from "./../config/index.js";

const callapi = (uri, method = "GET", data) => {
  return axios({
    url: API_URL + uri,
    method,
    data,
  });
};

const getListProductService = () => {
  return axios({
    url: "https://5a6451dcf2bae00012ca1a6a.mockapi.io/api/SanPham",
    method: "GET",
  });
};

const deleteProductService = (id) => {
  return axios({
    url: `https://5a6451dcf2bae00012ca1a6a.mockapi.io/api/SanPham/${id}`,
    method: "DELETE",
  });
};

const addProductService = (product) => {
  return axios({
    url: "https://5a6451dcf2bae00012ca1a6a.mockapi.io/api/SanPham",
    method: "POST",
    data: product,
  });
};

const getProductById = (id) => {
  return axios({
    url: `https://5a6451dcf2bae00012ca1a6a.mockapi.io/api/SanPham/${id}`,
    method: "GET",
  });
};

const updateProductService = (product) => {
  return axios({
    url: `https://5a6451dcf2bae00012ca1a6a.mockapi.io/api/SanPham/${product.id}`,
    method: "PUT",
    data: product,
  });
};

export {
  callapi,
  getListProductService,
  deleteProductService,
  addProductService,
  getProductById,
  updateProductService,
};
