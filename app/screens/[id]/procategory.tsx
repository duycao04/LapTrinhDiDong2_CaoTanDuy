import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  Text,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
// import Icon from "react-native-vector-icons/MaterialIcons"; // Import the icon library
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import Slider from "@/app/Screen/Slider";
import Category from "@/app/Screen/Category";
import { Product } from "@/app/interfaces";
import { fetchProductCategories } from "@/app/api/products";
import { fetchCartsAdd } from "@/app/api/cart";

const { width: windowWidth } = Dimensions.get("window");

const ProCate = () => {
  const { id } = useLocalSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const AddtoCart = async (productId) => {
    const request = {
      user_id: 1,
      product_id: productId,
      quantity: 1,
    };

    try {
      await fetchCartsAdd(request);
      Alert.alert("Thành công", "Sản phẩm đã được thêm vào giỏ hàng");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const loadProductcategories = async () => {
      try {
        const products = await fetchProductCategories(id);
        if (Array.isArray(products)) {
          setProducts(products);
        } else {
          console.error("products data is not an array");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadProductcategories();
  }, []);

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#FF4081" style={styles.loader} />
    );
  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchContainer}>
        {/* <Image
          source={require("@/assets/images/favicon.png")}
          style={styles.logo}
        /> */}
        <TextInput style={styles.searchInput} placeholder="Tìm kiếm . . . " />
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.search}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Link href="./Cart">
            {/* <Icon style={styles.carticon} name="add-shopping-cart" size={20} /> */}
            <Ionicons name="cart" style={styles.carticon} />
          </Link>
        </TouchableOpacity>
      </View>
      <Slider />
      <Category />
      <Text style={styles.title}>Sản phẩm nổi bật</Text>
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
                pathname: "/screens/[id]",
                params: { id: product.id },
              }}
            >
              <Text style={styles.productName}>{product.name}</Text>
            </Link>
            <Text style={styles.productPrice}>
              {product.price.toLocaleString()} đ
            </Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => AddtoCart(product.id)}
            >
              <Ionicons name="cart" style={styles.carticon} />
              <Text style={styles.addCartText}>Add Cart</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  productsContainer: {
    flexDirection: "row",
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
    marginLeft: 30, // Add some space between icon and text
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFF",
  },
  search: {
    justifyContent: "center",

    alignItems: "center",
    color: "#FFF",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
  carticon: {
    fontSize: 30,
    marginLeft: 8,
    color: "black",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 15,
  },
  searchInput: {
    flex: 1,
    borderColor: "#CFCFCF",
    borderWidth: 1,
    borderRadius: 14,
    padding: 8,
  },
  searchButton: {
    marginLeft: 8,
    color: "white",
    backgroundColor: "black",
    padding: 10,
    borderRadius: 15,
  },
  title: {
    textTransform: "uppercase",
    fontWeight: "bold",
    borderBottomColor: "black",
    color: "#FFA500",
    fontSize: 20,
    marginBottom: 12,
  },
  addcart: { color: "black", fontSize: 13, fontWeight: "bold" },
  categoryText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 12,
    textAlign: "center",
  },
});

export default ProCate;
