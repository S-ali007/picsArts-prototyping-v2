import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import SplashScreen from "@/src/components/SplashScreen";
import SignUpScreen from "@/src/components/SignUpScreen";
import WelcomeScreen from "@/src/components/WelcomeScreen";
import PasswordScreen from "@/src/components/PasswordScreen";
import UsernameScreen from "@/src/components/UsernameScreen";
import InterestScreen from "@/src/components/InterestScreen";
import ThemeScreen from "@/src/components/ThemeScreen";
import ComfartScreen from "@/src/components/ComfortScreens";
import Home from "@/src/components/Home";
import NavigationBar from "@/src/components/NavigationBar";
import CreateMain from "@/src/components/CreateMain";
import PasswordScreenIn from "@/src/components/PasswordSignIn";
import SignInScreen from "@/src/components/SignInScreen";
import ModelList from "@/src/components/ModelList";
import ResultComponent from "@/src/components/ResultComponent";
import { View, Text, TouchableOpacity, Button } from "react-native";

import { signOut } from "firebase/auth";
import { auth } from "@/firebaseConfig";
export type RootStackParamList = {
  SplashScreen: undefined;
  SignUpScreen: undefined;
  SignInScreen: undefined;
  WelcomeScreen: undefined;
  PasswordScreen: undefined;
  ResultComponent: undefined;
  PasswordScreenIn: undefined;
  UsernameScreen: undefined;
  InterestScreen: undefined;
  Theme: undefined;
  CreateMain: undefined;
  Comfart: undefined;
  Home: undefined;
  ImageSelector: undefined;
  ModelList: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();
const data = [
  {
    name: "Profile",
    navigation: "Home",
  },
  {
    name: "Theme",
    navigation: "Theme",
  },
  {
    name: "Comfort Settings",
    navigation: "Comfart",
  },
];
const signOutUser = async ({ navigation }: any) => {
  signOut(auth)
    .then(() => {
      navigation.navigate("SignInScreen");
    })
    .catch((error) => {
      console.log("error", error);
    });
};

function CustomDrawerContent({ navigation }: any) {
  const [selectedTab, setSelectedTab] = React.useState("Home");
  return (
   
    <View style={{ flex: 1, padding: 20, justifyContent: "space-between" }}>
      <View>
        {data.map((item, id) => {
          const handleTabSelect = (tab: string) => {
            setSelectedTab(tab);
            navigation.navigate(item.navigation);
          };
          return (
            <View key={id}>
              <TouchableOpacity onPress={() => handleTabSelect(item.name)}>
                <Text
                  style={[
                    { fontSize: 18, marginBottom: 20 },
                    selectedTab === item.name && {
                      color: "#7B1FA2",
                      fontWeight: "bold",
                      borderBottomWidth: 2,
                      borderBottomColor: "#7B1FA2",
                    },
                  ]}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
      <Button title="Logout" onPress={signOutUser} />
    </View>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen
        name="Home"
        options={{ title: "Home" }}
        component={HomeScreenWithNav}
        
      />
      <Drawer.Screen name="Theme" options={{ title: "Choose Theme" }}>
        {(props) => <ThemeScreen {...props} />}
      </Drawer.Screen>
      <Drawer.Screen
        name="Comfart"
        options={{ title: "Comfort Settings" }}
        component={ComfartScreen}
      />
    </Drawer.Navigator>
  );
}

function HomeScreenWithNav(props: any) {
  return (
    <View style={{ flex: 1 }}>
      <Home {...props} />
      <NavigationBar navigation={props.navigation} />
    </View>
  );
}

const AppNavigator = () => {
  const [theme, setTheme] = useState<string>("light");
  const [isComfortEnabled, setIsComfortEnabled] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = React.useState("Training Model");

  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignInScreen"
        component={SignInScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PasswordScreen"
        component={PasswordScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PasswordScreenIn"
        component={PasswordScreenIn}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UsernameScreen"
        component={UsernameScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="InterestScreen"
        component={InterestScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ResultComponent"
        component={ResultComponent}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="CreateMain" options={{ headerShown: false }}>
        {(props) => <CreateMain {...props} />}
      </Stack.Screen>
      <Stack.Screen
        name="Home"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;