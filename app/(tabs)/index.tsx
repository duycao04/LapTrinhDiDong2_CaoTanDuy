import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../Screen/Home";
import index from "./main";
import SignUp from "./signup";
import Order from "../(pages)/OrderSuccess";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Start = () => {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <NavigationContainer independent={true}>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Main" component={index} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Start;
