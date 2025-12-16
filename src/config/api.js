const getBaseURL = () => {
    if(import.meta.env.Dev){
        return "/api";
    }
    return import.meta.env.VITE_BASE_API_URL || "http://localhost:3000/api"
}

const api = (path) =>{
 const base = getBaseURL() ;

 return base.endsWith("/") ? `${base}${path}` : `${base}/${path}`
}



// User/Auth endpoints
export const USER_ENDPOINTS = {
  REGISTER_USER: api('users/registerUser'),
  REGISTER_ADMIN: api('users/registerAdmin'),
  LOGIN: api('users/login'),
  LOGOUT: api('users/logOut'),
  LOGIN_STATUS: api('users/loginStatus'),
  USER_PROFILE: api('users/UserProfile'),
};

// Ebook/Product endpoints
export const EBOOK_ENDPOINTS = {
  GET_ALL: api('ebook/getAllEbook'),
  GET_SINGLE: (id) => api(`ebook/singleEbook/${id}`),
  CREATE: api('ebook/createEbook'),
  UPDATE: (id) => api(`ebook/updateEbook/${id}`),
};

// Cart endpoints
export const CART_ENDPOINTS = {
  GET_USER_CART: api('cart/getUserCart'),
  ADD_TO_CART: api('cart/addToCart'),
  REMOVE_FROM_CART: api('cart/removeFromCart'),
  CLEAR_CART: api('cart/clearCart'),
};

// Order endpoints
export const ORDER_ENDPOINTS = {
  PLACE_ORDER: api('order/placeOrder'),
  GET_USER_ORDERS: api('order/getUserOrders'),
  GET_ORDER_BY_ID: (id) => api(`order/getOrderById/${id}`),
};

// API configuration for fetch requests
export const API_CONFIG = {
  credentials: 'include', // Required for httpOnly cookies
  headers: {
    'Content-Type': 'application/json',
  },
};

/**
 * Helper function to handle API responses
 */
export const handleApiResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

/**
 * Helper function to make API requests
 */
export const apiRequest = async (url, options = {}) => {
  const config = {
    ...API_CONFIG,
    ...options,
    headers: {
      ...API_CONFIG.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    return handleApiResponse(response);
  } catch (error) {
    // Handle network errors (connection refused, etc.)
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Unable to connect to server. Please make sure the backend server is running on port 5000.');
    }
    throw error;
  }
};