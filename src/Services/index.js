export {getFeaturedList, getProduct, getProductList} from "./productServices"

import dataService from "./dataService";
import cartService from "./cartService";
import orderService from "./orderServices";
import authService from "./authService";

export const { login, register, logout } = authService
export const { getUser, checkLoggingStatus } = dataService;
export const { getUserCart, addToCartAPI, removeFromCartAPI, clearCartAPI  } = cartService;  
  
export const {placeOrder,getUserOrder,getOrderById} = orderService
