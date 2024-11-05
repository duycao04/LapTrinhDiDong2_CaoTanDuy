import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { TextInput } from "react-native";
import { View } from "react-native";
import { Image, StyleSheet } from "react-native";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(""); // Trạng thái đăng ký
  const router = useRouter();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    } else {
      router.push("/Screen/Home"); // Chuyển đến màn hình đăng nhập nếu đăng ký thành công
    }

    try {
      const response = await fetch(
        "http://localhost/clothes-shop/public/api/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            password_confirmation: confirmPassword,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Đăng ký thành công"); // Hiển thị thông báo thành công
      } else {
        setMessage(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Failed to register");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/logoapp.png")}
        style={styles.logo}
      />

      <Text style={styles.title}>SIGN UP</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        keyboardType="default"
        value={name}
        onChangeText={setName}
        placeholderTextColor="#aaa"
      />

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
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="#aaa"
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholderTextColor="#aaa"
      />

      {/* Nút đăng ký */}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>REGISTER</Text>
      </TouchableOpacity>

      {/* Hiển thị thông báo */}
      {message ? <Text style={styles.message}>{message}</Text> : null}

      <TouchableOpacity style={styles.loginRedirect}>
        <Link href="./Home">
          <Text style={styles.loginText}>Already have an account? Log In</Text>
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
    marginBottom: 12,
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
  loginRedirect: {
    alignItems: "center",
  },
  loginText: {
    color: "#06213e",
    fontSize: 16,
    fontWeight: "500",
  },
});
