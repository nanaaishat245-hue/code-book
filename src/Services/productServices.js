
import { delay, mockDatabase } from "./mockDatabase";

const normaliseSearch = (value = "") => value.toString().trim().toLowerCase();

const matchesSearch = (product, searchTerm) => {
  const normalised = normaliseSearch(searchTerm);
  if (!normalised) {
    return true;
  }

  const haystack = [
    product.name,
    product.overview,
    product.long_description,
    product.price,
    product.id
  ]
    .filter(Boolean)
    .map((entry) => normaliseSearch(entry))
    .join(" ");

  return haystack.includes(normalised);
};

export async function getProductList(searchTerm = "") {
  const products = mockDatabase.getProducts();
  const filteredProducts = searchTerm
    ? products.filter((product) => matchesSearch(product, searchTerm))
    : products;

  return delay(filteredProducts);
}

export const getProduct = async (id) => {
  const numericId = Number(id);
  const product = mockDatabase
    .getProducts()
    .find((item) => item.id === numericId);

  if (!product) {
    throw new Error("Product not found");
  }

  return delay(product);
};

export const getFeaturedList = async () => {
  const products = mockDatabase.getProducts();
  const featuredIds = mockDatabase.getFeaturedIds();
  const featured = products.filter((product) =>
    featuredIds.includes(product.id)
  );

  return delay(featured);
};
