
import { delay, mockDatabase } from "./mockDatabase";

const cartSnapshot = () => {
  const cartIds = mockDatabase.getCartItems();
  const products = mockDatabase.getProducts();
  const cartList = cartIds
    .map((id) => products.find((product) => product.id === id))
    .filter(Boolean);

  const total = Number(
    cartList.reduce((sum, item) => sum + Number(item.price || 0), 0).toFixed(2)
  );

  return { cartList, total, cartIds };
};

const getUserCart = async () => {
  const { cartList, total } = cartSnapshot();
  return delay({ cartList, total });
};

const addToCartAPI = async (product) => {
  if (!product || typeof product.id === "undefined") {
    throw new Error("Invalid product");
  }

  const { cartIds } = cartSnapshot();
  if (!cartIds.includes(product.id)) {
    mockDatabase.saveCartItems([...cartIds, product.id]);
  }

  return getUserCart();
};

const removeFromCartAPI = async (product) => {
  if (!product || typeof product.id === "undefined") {
    throw new Error("Invalid product");
  }

  const { cartIds } = cartSnapshot();
  const updatedIds = cartIds.filter((id) => id !== product.id);
  mockDatabase.saveCartItems(updatedIds);
  return getUserCart();
};

const clearCartAPI = async () => {
  mockDatabase.saveCartItems([]);
  return getUserCart();
};

const cartService = {
  getUserCart,
  addToCartAPI,
  removeFromCartAPI,
  clearCartAPI
};

export default cartService;
