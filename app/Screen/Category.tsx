import React, { useEffect, useState } from "react";
import { fetchCategorys } from "../api/categorys";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Categories } from "../interfaces";
import { useRouter } from "expo-router";

const Category = () => {
  const [categorys, setCategorys] = useState<Categories>([]); // Khởi tạo categorys là mảng rỗng
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  useEffect(() => {
    const loadCategorys = async () => {
      try {
        const categorys = await fetchCategorys();
        console.log(categorys); // Kiểm tra phản hồi API
        if (categorys) {
          setCategorys(categorys); // Kiểm tra xem data.categorys có phải là mảng không
        } else {
          console.error("categorys data is not an array");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadCategorys();
  }, [!loading]);

  if (loading) {
    return <ActivityIndicator size="large" color="#FF4081" />;
  }
  const handleCategoryPress = (categoryName: string) => {
    console.log(`Selected category: ${categoryName}`);
    // Add logic to handle category selection here
  };
  return (
    <>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/(tabs)/main",
            })
          }
          style={styles.categoryCard}
        >
          {/* onPress={handleSubmit} */}
          <Text style={styles.categoryText}>Tất cả</Text>
        </TouchableOpacity>

        {categorys.map((category, index) => (
          <View>
            <TouchableOpacity
              key={category.name}
              style={styles.categoryCard}
              onPress={() =>
                router.push({
                  pathname: "/screens/[id]/procategory",
                  params: { id: category.id },
                })
              }
            >
              <Text style={styles.categoryText}>{category.name}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </>
  );
};

export default Category;

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
  proname: {
    color: "#FFF",
    marginTop: 5,
    marginBottom: 3,
    fontSize: 16,
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
  sliderContainer: {
    height: 200,
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 16,
  },
  sliderImage: {
    height: "100%",
    width: "100%",
  },
  title: {
    textTransform: "uppercase",
    fontWeight: "bold",
    borderBottomColor: "black",
    color: "#FFA500",
    fontSize: 20,
    marginBottom: 12,
  },
  categoriesContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  categoryCard: {
    fontSize: 12,
    marginHorizontal: 6,
    width: 90,

    color: "white",
    backgroundColor: "black",
    borderRadius: 10,
    padding: 8, // Add padding for better touch area
    alignItems: "center",
    marginBottom: 10,
  },
  addcart: { color: "black", fontSize: 13, fontWeight: "bold" },
  productsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
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
