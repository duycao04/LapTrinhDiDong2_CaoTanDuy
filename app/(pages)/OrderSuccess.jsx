import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";

const OrderScreen = ({ navigation }) => {
  const animation = useRef(null);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/main");
    }, 3000);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LottieView
        source={require("../../assets/anima.json")}
        ref={animation}
        autoPlay
        loop={false}
        style={styles.animation}
      />
      <Text style={styles.title}>Đặt hàng thành công!</Text>
      <Text style={styles.orderMessage}>
        Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đã được xác nhận.
      </Text>
      <View style={styles.shippingInfo}>
        <Text style={styles.sectionTitle}>Thông tin vận chuyển:</Text>
        <Text>Địa chỉ: 123 Đường ABC, Quận X, TP HCM</Text>
        <Text>Phương thức vận chuyển: Giao hàng nhanh</Text>
        <Text>Thời gian giao dự kiến: 3-5 ngày</Text>
      </View>

      <Button
        title="Về trang chủ"
        onPress={() => navigation.navigate("Home")}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
  },
  animation: {
    width: 200,
    height: 200,
  },
  successImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  orderMessage: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  orderInfo: {
    width: "100%",
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    marginBottom: 15,
  },
  productInfo: {
    width: "100%",
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    marginBottom: 15,
  },
  product: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  productImage: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
  },
  shippingInfo: {
    width: "100%",
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    marginBottom: 15,
  },
});

export default OrderScreen;
