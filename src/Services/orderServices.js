import { ORDER_ENDPOINTS, apiRequest } from "../config/api";

/**
 * Transform backend order data to match frontend format
 */
const transformOrderData = (orderData) => {
  return {
    ...orderData,
    id: orderData._id || orderData.id,
    orderId: orderData._id || orderData.orderId,
    amount_paid: orderData.amount_paid || orderData.amountPaid,
    createdAt: orderData.createdAt || orderData.created_at,
  };
};

/**
 * Place an order from cart
 * @param {Array} cartItems - Array of cart items (optional, backend uses cart from user)
 * @returns {Promise<Object>} Order data
 */
const placeOrder = async (cartItems) => {
  try {
    // Backend gets cart from authenticated user, so we don't need to send cartItems
    // But we keep the parameter for compatibility with existing code
    const orderData = await apiRequest(ORDER_ENDPOINTS.PLACE_ORDER, {
      method: "POST",
      body: JSON.stringify({}), // Backend uses user's cart from database
    });

    return transformOrderData(orderData);
  } catch (error) {
    throw new Error(error.message || "Failed to place order");
  }
};

/**
 * Get all orders for the current user
 * @returns {Promise<Array>} Array of user orders
 */
const getUserOrder = async () => {
  try {
    const orders = await apiRequest(ORDER_ENDPOINTS.GET_USER_ORDERS, {
      method: "GET",
    });

    // Transform all orders
    return orders.map(transformOrderData);
  } catch (error) {
    // If no orders found, return empty array
    if (error.message.includes("not found") || error.message.includes("No order")) {
      return [];
    }
    throw new Error(error.message || "Failed to fetch orders");
  }
};

/**
 * Get order by ID
 * @param {string} orderId - Order ID (_id from MongoDB)
 * @returns {Promise<Object>} Order data
 */
const getOrderById = async (orderId) => {
  if (!orderId) {
    throw new Error("order id is required");
  }

  try {
    const orderData = await apiRequest(ORDER_ENDPOINTS.GET_ORDER_BY_ID(orderId), {
      method: "GET",
    });

    return transformOrderData(orderData);
  } catch (error) {
    throw new Error(error.message || "Order not found");
  }
};

const orderService = {
  placeOrder,
  getUserOrder,
  getOrderById,
};

export default orderService;;