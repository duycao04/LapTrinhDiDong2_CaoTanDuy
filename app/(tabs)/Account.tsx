import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { logoutUser } from "../api/Auth";

const AccountScreen = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const handleLogout = async () => {
    // const data = await logoutUser();
    // setMessage(data.message); // Cập nhật thông báo thành công
    // setError("");
    router.push("/Screen/Home");
  };

  return (
    <ScrollView style={styles.container}>
      {/* Hình đại diện và thông tin người dùng */}
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: "../../assets/images/react-logo.png" }}
          style={styles.avatar}
        />
        <View style={styles.userInfo}>
          <Text style={styles.username}>Cao Tấn Duy</Text>
        </View>
      </View>

      {/* Thông tin tài khoản */}
      <View style={styles.profileInfo}>
        <Text style={styles.label}>Địa chỉ:</Text>
        <Text style={styles.infoText}>
          Số 5, Đào Trinh Nhất, p.Linh Tây, Thủ Đức
        </Text>
        <Text style={styles.label}>Số điện thoại:</Text>
        <Text style={styles.infoText}>0383958932</Text>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.infoText}>dcao59995@gmail.com</Text>
      </View>

      {/* Nút đăng xuất (cải tiến) */}
      <View style={styles.logoutButtonContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#ff5c5c",
  },
  userInfo: {
    marginLeft: 20,
  },
  username: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
  },
  welcomeText: {
    marginTop: 5,
    color: "#888",
  },
  profileInfo: {
    marginVertical: 20,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  infoText: {
    fontSize: 16,
    color: "#777",
    marginBottom: 15,
  },
  logoutButtonContainer: {
    marginTop: 250,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  logoutButton: {
    backgroundColor: "#003366",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#ff5c5c",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AccountScreen;
