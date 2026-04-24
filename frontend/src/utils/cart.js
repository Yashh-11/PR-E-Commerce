const CART_STORAGE_KEY = "cartItems";

export const getStoredCartItems = () => {
  try {
    const data = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || "[]");
    return Array.isArray(data) ? data : [];
  } catch (error) {
    return [];
  }
};

export const saveCartItems = (items) => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
};

export const addProductToCart = (product) => {
  const items = getStoredCartItems();
  const productId = product?._id || product?.id || product?.title;

  const existingIndex = items.findIndex(
    (item) => (item._id || item.id || item.title) === productId
  );

  if (existingIndex >= 0) {
    items[existingIndex].qty += 1;
  } else {
    items.push({
      _id: product?._id,
      title: product?.title || "Product",
      description: product?.description || "",
      price: Number(product?.price) || 0,
      qty: 1,
    });
  }

  saveCartItems(items);
  return items;
};
