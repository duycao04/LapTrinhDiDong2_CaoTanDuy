import React, { useEffect, useState } from "react";
import Slider from "../Screen/Slider";
import {
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  Text,
} from "react-native";
import Category from "../Screen/Category";
import Product from "../Screen/Product";
// import Icon from "react-native-vector-icons/MaterialIcons"; // Import the icon library
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const { width: windowWidth } = Dimensions.get("window");

const HomeScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchContainer}>
        {/* <Image
          source={require("@/assets/images/favicon.png")}
          style={styles.logo}
        /> */}
        <TextInput style={styles.searchInput} placeholder="Tìm kiếm . . . " />
        <TouchableOpacity>
          <Link href="./Cart">
            {/* <Icon style={styles.carticon} name="add-shopping-cart" size={20} /> */}
            <Ionicons name="cart" style={styles.carticon} />
          </Link>
        </TouchableOpacity>
        <TouchableOpacity>
          <Link href="./Account">
            {/* <Icon style={styles.carticon} name="add-shopping-cart" size={20} /> */}
            <Ionicons name="person" style={styles.carticon} />
          </Link>
        </TouchableOpacity>
      </View>
      <Slider />
      <Category />

      <Text style={styles.title}>Sản phẩm nổi bật</Text>
      <Product />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFF",
  },
  search: {
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
    color: "#666666",
    backgroundColor: "white",
    padding: 8,
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
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
    color: "white",
    backgroundColor: "black",
    padding: 10,
    borderRadius: 12,
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
  productsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  productCard: {
    fontSize: 18,
    width: "48%",
    backgroundColor: "#363636",
    borderRadius: 6,
    padding: 8,
    marginBottom: 15,
    alignItems: "center",
  },
  productImage: {
    objectFit: "fill",
    backgroundColor: "white",
    height: 100,
    width: "100%",
    borderRadius: 6,
  },
  addButton: {
    paddingLeft: 10,
    justifyContent: "flex-end",
    marginTop: 8,
    backgroundColor: "#EE7621",
    padding: 6,
    borderRadius: 6,
    alignItems: "center",
  },
  categoryText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 12,
    textAlign: "center",
  },
});

export default HomeScreen;
