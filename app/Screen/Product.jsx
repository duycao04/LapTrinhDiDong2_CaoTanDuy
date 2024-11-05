import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native";
import { fetchProducts } from "../api/products";
import { Link } from "expo-router";
import { fetchCartsAdd } from "../api/cart";
import { useCart } from "@/Context/CartContext";
const Product = () => {
  const [products, setProducts] = useState([]);
  const [cartUpdated, setCartUpdated] = useState(false);
  const [loading, setLoading] = useState(true);
  const { triggerRefeshCart } = useCart();

  const AddtoCart = async (productId) => {
    const request = {
      user_id: 1,
      product_id: productId,
      quantity: 1,
    };
    try {
      await fetchCartsAdd(request); // API call to add item
      triggerRefeshCart();
      Alert.alert("Thành công", "Sản phẩm đã được thêm vào giỏ hàng");
      setCartUpdated((prev) => !prev); // Toggle cartUpdated to reload cart
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    }
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await fetchProducts();
        if (Array.isArray(products)) {
          setProducts(products);
        } else {
          console.error("Products data is not an array");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [cartUpdated]); // Reload products when cartUpdated changes

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#FF4081" style={styles.loader} />
    );
  }

  return (
    <View style={styles.productsContainer}>
      {products.map((product) => (
        <View key={product.id} style={styles.productCard}>
          <Image
            source={{
              uri: `http://localhost/clothes-shop/public/images/products/${product.image}`,
            }}
            style={styles.productImage}
            resizeMode="cover"
          />
          <Link
            href={{
              pathname: "screens/[id]",
              params: { id: product.id },
            }}
          >
            <Text style={styles.productName}>{product.name}</Text>
          </Link>
          <Text style={styles.productPrice}>
            {product.price.toLocaleString()} đ
          </Text>
          <View style={styles.productActions}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => AddtoCart(product.id)}
            >
              <Text style={styles.addCartText}>Thêm Giỏ Hàng</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  productActions: {
    flex: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  productsContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: 10,
  },
  productCard: {
    width: "45%",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  productImage: {
    marginBottom: 10,
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  productName: {
    color: "#333",
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  productPrice: {
    color: "#FF4081",
    fontSize: 14,
    marginVertical: 5,
  },
  addButton: {
    backgroundColor: "#EE7621",
    padding: 10,
    borderRadius: 6,
    flexDirection: "row",
    alignContent: "space-between",
    marginTop: 10,
  },
  addCartText: {
    color: "#fff",
    fontSize: 14,
    // Add some space between icon and text
  },
});
