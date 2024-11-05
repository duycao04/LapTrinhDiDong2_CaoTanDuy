import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { DeleteAll, DeleteItem, fetchCarts } from "../api/cart";
import { CartList, CartItem } from "../interfaces";
import { useCart } from "../../Context/CartContext";

const Cart = () => {
  const [carts, setCart] = useState<CartList>();
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const router = useRouter();
  const { refreshCart } = useCart();
  useEffect(() => {
    const loadCarts = async () => {
      try {
        const cart = await fetchCarts(1);
        console.log(cart);
        setCart(cart.cart);
        setCartItems(cart.cart.items);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadCarts();
  }, [refreshCart]);

  const increaseQuantity = (itemId: any) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (itemId: any) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };
  const handlePayment = async () => {
    try {
      await DeleteAll();
      router.push("/(pages)/OrderSuccess");
    } catch (error) {
      console.error("Failed to delete cart items:", error);
      Alert.alert("Error", "Could not delete items in the cart.");
    }
  };
  const removeItem = async () => {
    try {
      await DeleteItem();
    } catch (error) {
      console.error("Failed to delete cart items:", error);
      Alert.alert("Error", "Could not delete items in the cart.");
    }
  };

  // Function to remove an item from the cart
  // const removeItem = (itemId: any) => {
  //   Alert.alert(
  //     "Xác Nhận",
  //     "Bạn có chắc chắn muốn xoá sản phẩm này?",
  //     [
  //       { text: "Không" },
  //       {
  //         text: "Có",
  //         onPress: () => {
  //           const updatedCart = cartItems.filter((item) => item.id !== itemId);
  //           setCartItems(updatedCart);
  //         },
  //       },
  //     ],
  //     { cancelable: true }
  //   );
  // };

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#FF4081" style={styles.loader} />
    );
  }
  console.log(carts?.items);
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Giỏ Hàng</Text>

      {/* Cart Items List */}
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            {/* Product Image */}
            <Image
              source={{
                uri: `http://localhost/clothes-shop/public/images/products/${item.product.image}`,
              }}
              style={styles.productImage}
            />

            {/* Product Details */}
            <View style={styles.detailsContainer}>
              <Text style={styles.productName}>{item.product.name}</Text>
              <Text style={styles.productPrice}>
                {item.product.price.toLocaleString()} VND
              </Text>
              {/* Quantity Controls */}
              <View style={styles.quantityControls}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => decreaseQuantity(item.id)}
                >
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => increaseQuantity(item.id)}
                >
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
              {/* Remove Button */}
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeItem()}
              >
                <Text style={styles.removeButtonText}>Xoá</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Total Price */}
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>
          Tổng Tiền: {getTotalPrice().toLocaleString()} VND
        </Text>
        <TouchableOpacity style={styles.checkoutButton} onPress={handlePayment}>
          <Text style={styles.checkout}>Thanh Toán</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  cartItem: {
    flexDirection: "row",
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  productImage: {
    width: 80,
    height: "100%",
    marginRight: 16,
  },
  detailsContainer: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 16,
    color: "#FF6347",
    marginBottom: 8,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  quantityButton: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
  },
  quantityButtonText: {
    fontSize: 18,
    color: "#000",
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  removeButton: {
    alignItems: "center",
    justifyContent: "center",
    width: "35%",
    backgroundColor: "#FF6347",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  removeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  totalContainer: {
    paddingVertical: 16,
    borderTopWidth: 1,
    borderColor: "#ccc",
    marginTop: 16,
  },
  totalText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  checkoutButton: {
    backgroundColor: "#28a745",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  checkout: { color: "white" },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Cart;
