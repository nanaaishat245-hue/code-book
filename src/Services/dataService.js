import { USER_ENDPOINTS, apiRequest } from "../config/api";

/**
 * Transform backend user response to match frontend format
 */
const transformUserData = (userData) => {
  return {
    id: userData._id,
    _id: userData._id,
    name: userData.name,
    email: userData.email,
    isAdmin: Boolean(userData.isAdmin),
    cartList: userData.cartList || [],
    orderList: userData.orderList || [],
  };
};

/**
 * Get current user profile
 * @returns {Promise<Object|null>} User data or null if not authenticated
 */
const getUser = async () => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const userData = await apiRequest(USER_ENDPOINTS.USER_PROFILE, {
      method: "GET",
    });

    return transformUserData(userData);
  } catch (error) {
    // If not authenticated or user not found, return null
    return null;
  }
};

/**
 * Check if user is logged in
 * @returns {Promise<boolean>} True if logged in, false otherwise
 */
const checkLoggingStatus = async () => {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    const response = await fetch(USER_ENDPOINTS.LOGIN_STATUS, {
      method: "GET",
      credentials: "include",
    });
    
    if (!response.ok) {
      return false;
    }
    
    const status = await response.json();
    return Boolean(status);
  } catch (error) {
    return false;
  }
};

const dataService = {
  getUser,
  checkLoggingStatus,
};

export default dataService;