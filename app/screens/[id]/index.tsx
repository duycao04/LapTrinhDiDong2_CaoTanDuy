import { fetchProductDetail } from "@/app/api/products";
import { Product } from "@/app/interfaces";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { Link, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ActivityIndicator, Icon } from "react-native-paper";

const ProductDetail = () => {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1); // For quantity adjustment
  const [selectedSize, setSelectedSize] = useState("M"); // For size selection

  // Handler to increase quantity
  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  // Handler to decrease quantity (cannot go below 1)
  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  useEffect(() => {
    const loadProductDetail = async () => {
      try {
        const product = await fetchProductDetail(id);
        console.log(product);
        setProduct(product);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadProductDetail();
  }, []);

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#FF4081" style={styles.loader} />
    );
  }

  return (
    <>
      <ScrollView style={styles.container}>
        <TouchableOpacity style={styles.back}>
          <Link href="/main" style={styles.link}>
            <Ionicons name="arrow-back" size={24} />
          </Link>
        </TouchableOpacity>
        <Image
          source={{
            uri: `http://localhost/clothes-shop/public/images/products/${product?.image}`,
          }}
          style={styles.productImage}
          resizeMode="cover"
        />
        <Text style={styles.productName}>{product?.name}</Text>
        <Text style={styles.productPrice}>
          {product?.price.toLocaleString()} đ
        </Text>
        <Text style={styles.productDescription}>{product?.description}</Text>
        <View style={styles.sizeContainer}>
          <Text style={styles.label}>Chọn Kích Cỡ: </Text>
          <Picker
            selectedValue={selectedSize}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedSize(itemValue)}
          >
            <Picker.Item label="S" value="S" />
            <Picker.Item label="M" value="M" />
            <Picker.Item label="L" value="L" />
            <Picker.Item label="XL" value="XL" />
          </Picker>
        </View>

        {/* Quantity Adjustment */}
        <View style={styles.quantityContainer}>
          <Text style={styles.label}>Số Lượng: </Text>
          <View style={styles.quantityControls}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={decreaseQuantity}
            >
              <Text style={styles.quantityButtonText}>
                <Ionicons name="remove" />
              </Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={increaseQuantity}
            >
              <Text style={styles.quantityButtonText}>
                <Ionicons name="add" />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  link: { width: 30 },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white ",
  },
  productImage: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
    borderRadius: 8,
    marginBottom: 16,
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  back: {
    borderWidth: 1,
    borderColor: "black",
    padding: 6,
    maxWidth: 40,
    marginBottom: 12,
    borderRadius: 12,
  },
  productPrice: {
    fontSize: 20,
    color: "#FF6347",
    marginBottom: 16,
  },
  productDescription: {
    fontSize: 16,
    color: "#666",
    marginBottom: 24,
  },
  sizeContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  picker: {
    borderRadius: 3,
    height: 25,
    width: 100,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    backgroundColor: "black",
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
  },
  quantityButtonText: {
    fontSize: 18,
    color: "white",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  button: {
    marginTop: 40,
    borderRadius: 6,
    color: "white",
    width: "100%",
    padding: 16,
    backgroundColor: "#EE7621",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});
