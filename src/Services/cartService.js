import { CART_ENDPOINTS, apiRequest } from "../config/api";

/**
 * Transform backend cart data to match frontend format
 */
const transformCartData = (cartData) => {
  const cartList = cartData.cartList || [];
  const total = Number(
    cartList.reduce((sum, item) => sum + Number(item.price || 0), 0).toFixed(2)
  );

  return {
    cartList,
    total,
  };
};

/**
 * Get user's cart
 * @returns {Promise<Object>} { cartList, total }
 */
const getUserCart = async () => {
  try {
    const cartData = await apiRequest(CART_ENDPOINTS.GET_USER_CART, {
      method: "GET",
    });

    return transformCartData(cartData);
  } catch (error) {
    // If cart not found, return empty cart
    if (error.message.includes("not found")) {
      return { cartList: [], total: 0 };
    }
    throw new Error(error.message || "Failed to fetch cart");
  }
};

/**
 * Add product to cart
 * @param {Object} product - Product object with id
 * @returns {Promise<Object>} Updated cart data
 */
const addToCartAPI = async (product) => {
  if (!product || typeof product.id === "undefined") {
    throw new Error("Invalid product");
  }

  try {
    const cartData = await apiRequest(CART_ENDPOINTS.ADD_TO_CART, {
      method: "POST",
      body: JSON.stringify({ id: product.id }),
    });

    return transformCartData(cartData);
  } catch (error) {
    throw new Error(error.message || "Failed to add item to cart");
  }
};

/**
 * Remove product from cart
 * @param {Object} product - Product object with id
 * @returns {Promise<Object>} Updated cart data
 */
const removeFromCartAPI = async (product) => {
  if (!product || typeof product.id === "undefined") {
    throw new Error("Invalid product");
  }

  try {
    const cartData = await apiRequest(CART_ENDPOINTS.REMOVE_FROM_CART, {
      method: "DELETE",
      body: JSON.stringify({ id: product.id }),
    });

    return transformCartData(cartData);
  } catch (error) {
    throw new Error(error.message || "Failed to remove item from cart");
  }
};

/**
 * Clear all items from cart
 * @returns {Promise<Object>} Empty cart data
 */
const clearCartAPI = async () => {
  try {
    const cartData = await apiRequest(CART_ENDPOINTS.CLEAR_CART, {
      method: "DELETE",
    });

    return transformCartData(cartData);
  } catch (error) {
    throw new Error(error.message || "Failed to clear cart");
  }
};

const cartService = {
  getUserCart,
  addToCartAPI,
  removeFromCartAPI,
  clearCartAPI,
};

export default cartService;