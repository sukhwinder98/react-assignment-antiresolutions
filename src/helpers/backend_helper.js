import * as url from "./url_helper";
import { postNew, getNew, del, put } from "./api_helper_rs";

const handleLogin = (data, config) => {
  return postNew(url.LOGIN, data, config)
};

const getAllProducts = () => {
  return getNew(url.ALL_PRODUCTS)
}

const getProductDetail = (id) => {
  return getNew(url.ALL_PRODUCTS + "/" + id)
}

const AddNewProduct = (data) => {
  return getNew(url.ADD_PRODUCT, data)
}

const handleUpdateProduct = (id, data) => {
  return put(url?.UPDATE_PRODUCT + "/" + id, data)
}
const deleteProduct = (id) => {
  return del(url.DELETE_PRODUCT + "/" + id)
}

export {
  handleLogin,
  getAllProducts,
  getProductDetail,
  AddNewProduct,
  handleUpdateProduct,
  deleteProduct,
};
