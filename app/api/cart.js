const API_URL = "http://localhost/clothes-shop/public/api";

export const fetchCarts = async (user_id) => {
  try {
    const response = await fetch(`${API_URL}/cart/items/${user_id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data; // Trả về danh sách sản phẩm
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; // Ném lỗi để xử lý ở nơi gọi
  }
};

export const fetchCartsAdd = async (request) => {
  try {
    const response = await fetch(`${API_URL}/carts/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);
    return data; // Trả về danh sách sản phẩm
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; // Ném lỗi để xử lý ở nơi gọi
  }
};
export const UpdateQuantity = async (request, userId, productId) => {
  try {
    const response = await fetch(
      `${API_URL}/cart/${userId}/update-quantity/${productId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data; // Trả về danh sách sản phẩm
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; // Ném lỗi để xử lý ở nơi gọi
  }
};
export const DeleteItem = async (request, userId, productId) => {
  try {
    const response = await fetch(
      `${API_URL}/cart/${userId}/delete-item/${productId}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data; // Trả về danh sách sản phẩm
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; // Ném lỗi để xử lý ở nơi gọi
  }
};
export const DeleteAll = async (userId = 1) => {
  try {
    const response = await fetch(`${API_URL}/cart/delete-all/${userId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting cart items:", error);
    throw error;
  }
};
