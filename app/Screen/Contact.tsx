///
import { Link } from "expo-router";
import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { rgbaColor } from "react-native-reanimated/lib/typescript/reanimated2/Colors";

export default function Contact() {
  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.image}
          source={require("../../assets/images/OIF-removebg-preview.png")}
        />
      </View>

      <View>
        <Text style={styles.signin}>Contact US!</Text>
      </View>
      <View>
        <Text style={styles.text}>Full Name</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Type here"
          keyboardType="numeric"
        />
      </View>
      <View>
        <Text style={styles.text}>Email</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Type here"
          keyboardType="numeric"
        />
      </View>
      <View>
        <Text style={styles.text}>Message </Text>
        <TextInput
          style={styles.textInputMess}
          placeholder="Type here"
          keyboardType="numeric"
        />
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    margin: 8,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#9BF6F9",
    padding: 30,
    width: "100%",
    height: "100%",
  },
  text: {
    width: 300,
    marginTop: 5,
    color: "green",
    alignItems: "center",
  },
  // titleContainer: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   gap: 8,
  // },
  // stepContainer: {
  //   gap: 8,
  //   marginBottom: 8,
  // },
  // reactLogo: {
  //   height: 178,
  //   width: 290,
  //   bottom: 0,
  //   left: 0,
  //   position: "absolute",
  // },
  image: {
    alignItems: "center",
    width: 320,
    height: 100,
  },
  signin: {
    fontFamily: "sans-ser",
    alignItems: "center",
    fontSize: 30,
    marginTop: 20,
    width: 150,
    height: "auto",
  },
  button: {
    alignItems: "center",
    width: 100,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: "gray",
    padding: 10,
  },
  textInputMess: {
    height: 40,
    margin: 10,
    borderWidth: 1,
    padding: 50,
    borderRadius: 10,
  },
  buttonText: {},
});
