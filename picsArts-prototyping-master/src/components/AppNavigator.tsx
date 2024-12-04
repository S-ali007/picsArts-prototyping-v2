import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { View, Text } from "react-native";
import Home from "./Home";

const Drawer = createDrawerNavigator();

// Example additional screen
const About = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>About Page</Text>
  </View>
);

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          drawerStyle: { backgroundColor: "#f6f8fa", width: 240 },
          headerStyle: { backgroundColor: "#0D80F2" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontFamily: "Comfortaa_700Bold" },
        }}
      >
        <Drawer.Screen name="Home" component={Home} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
