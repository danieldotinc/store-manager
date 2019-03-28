import {
  GET_ERRORS,
  CLEAR_CURRENT_PRODUCT,
  PRODUCT_LOADING,
  GET_PRODUCT,
  GET_PRODUCTS,
  ADD_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT
} from "./types";
import {
  getProduct,
  getProducts,
  deleteProduct,
  saveProduct,
  updateProduct
} from "../services/productService";
import { toast } from "react-toastify";

export const setProductLoading = () => {
  return {
    type: PRODUCT_LOADING
  };
};

export const clearCurrentProduct = () => {
  return {
    type: CLEAR_CURRENT_PRODUCT
  };
};

export const getProductItem = id => async dispatch => {
  dispatch(setProductLoading());
  const { data } = await getProduct(id);
  dispatch({
    type: GET_PRODUCT,
    payload: data
  });
};

export const getProductItems = () => async dispatch => {
  dispatch(setProductLoading());
  const { data } = await getProducts();
  dispatch({
    type: GET_PRODUCTS,
    payload: data
  });
};

export const addProductItem = product => async dispatch => {
  try {
    await saveProduct(product);
    dispatch({
      type: ADD_PRODUCT,
      payload: product
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 404) {
      toast.error("Error!");
    }
  }
};

export const updateProductItem = product => async dispatch => {
  try {
    await updateProduct(product);
    dispatch({
      type: UPDATE_PRODUCT,
      payload: product
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 404) {
      toast.error("Error!");
    }
  }
};

export const deleteProductItem = id => async dispatch => {
  try {
    await deleteProduct(id);
    dispatch({
      type: DELETE_PRODUCT,
      payload: id
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 404) {
      toast.error("این آیتم قبلا حذف شده است.");
    }
  }
};
