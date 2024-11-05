import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { loginUser } from "../api/Auth";

export default function LoginScreen({}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Hàm xử lý đăng nhập
  const handleLogin = async () => {
    if (email && password) {
      try {
        const data = await loginUser(email, password); // Gọi hàm đăng nhập
        setMessage(data.message); // Cập nhật thông báo thành công
        setError("");
        router.push("/main");
      } catch {
        setMessage("");
        setError("Sai Thông Tin!");
        // Xóa thông báo thành công nếu có lỗi
      }
    } else {
      setError("Vui lòng điền đầy đủ thông tin!"); // Thông báo khi thiếu trường
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/logoapp.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>SIGN IN</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#aaa"
      />

      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="#aaa"
      />
      {message && <Text style={styles.message}>{message}</Text>}
      {error && <Text style={styles.errorMessage}>{error}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>

      {/* Hiển thị thông báo nếu có */}

      {/* Điều hướng sang màn hình đăng ký */}
      <TouchableOpacity style={styles.loginRedirect}>
        <Link href="/(tabs)/signup">
          <Text style={styles.loginText}>Chưa có tài khoản? Đăng Kí</Text>
        </Link>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    backgroundColor: "white",
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    color: "#06213e",
  },
  input: {
    height: 50,
    width: 300,
    alignSelf: "center",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
    fontSize: 16,
    color: "#333",
  },
  button: {
    marginTop: 20,
    height: 50,
    backgroundColor: "#06213e",
    borderRadius: 8,
    width: 180,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
  },
  message: {
    fontSize: 16,
    color: "green",
    textAlign: "center",
    marginBottom: 16,
  },
  errorMessage: {
    fontSize: 20,
    color: "red",
    textAlign: "center",
    marginBottom: 16,
  },
  loginRedirect: {
    alignItems: "center",
  },
  loginText: {
    color: "#06213e",
    fontSize: 16,
    fontWeight: "500",
  },
});
