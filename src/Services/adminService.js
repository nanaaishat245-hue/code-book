import { EBOOK_ENDPOINTS, apiRequest } from "../config/api";
import { getUser } from "./index";

/**
 * Normalize product data for API submission
 */
const normaliseProduct = (product) => {
  const {
    name,
    overview,
    long_description,
    longDescription,
    rating,
    poster,
    size,
    inStock,
    in_stock,
    bestSeller,
    best_seller,
    price,
  } = product;

  return {
    name: name?.trim() || "",
    overview: overview?.trim() || "",
    longDescription: long_description?.trim() || longDescription?.trim() || "",
    rating: Number(rating),
    poster: poster?.trim() || "",
    size: Number(size),
    inStock: typeof inStock === "boolean" ? inStock : Boolean(in_stock),
    bestSeller: typeof bestSeller === "boolean" ? bestSeller : Boolean(best_seller),
    price: Number(price),
  };
};

/**
 * Transform backend product response to match frontend format
 */
const transformProduct = (product) => {
  return {
    ...product,
    long_description: product.longDescription || product.long_description,
    longDescription: product.longDescription || product.long_description,
    in_stock: product.inStock !== undefined ? product.inStock : product.in_stock,
    best_seller: product.bestSeller !== undefined ? product.bestSeller : product.best_seller,
  };
};

/**
 * Create a new ebook/product (Admin only)
 * @param {Object} ebookData - Product data
 * @returns {Promise<Object>} Created product
 */
const createEbook = async (ebookData) => {
  try {
    const productData = normaliseProduct(ebookData);

    if (!productData.name || !productData.overview || !productData.longDescription) {
      throw new Error("Name, Overview, and Long Description are required");
    }

    if (!productData.price || productData.price <= 0) {
      throw new Error("Valid price is required");
    }

    if (!productData.rating || productData.rating < 1 || productData.rating > 5) {
      throw new Error("Rating must be between 1 and 5");
    }

    const createdProduct = await apiRequest(EBOOK_ENDPOINTS.CREATE, {
      method: "POST",
      body: JSON.stringify(productData),
    });

    return transformProduct(createdProduct);
  } catch (error) {
    throw new Error(error.message || "Failed to create product");
  }
};

/**
 * Update an existing ebook/product (Admin only)
 * @param {string|number} id - Product ID
 * @param {Object} ebookData - Updated product data
 * @returns {Promise<Object>} Updated product
 */
const updateEbook = async (id, ebookData) => {
  try {
    const productData = normaliseProduct(ebookData);

    const updatedProduct = await apiRequest(EBOOK_ENDPOINTS.UPDATE(id), {
      method: "PATCH",
      body: JSON.stringify(productData),
    });

    return transformProduct(updatedProduct);
  } catch (error) {
    throw new Error(error.message || "Failed to update product");
  }
};

/**
 * Check if current user is admin
 * @returns {Promise<boolean>} True if user is admin
 */
const checkAdminStatus = async () => {
  try {
    const user = await getUser();
    return Boolean(user?.isAdmin);
  } catch (error) {
    return false;
  }
};

const adminService = {
  createEbook,
  updateEbook,
  checkAdminStatus,
};

export default adminService;