import React, { useEffect } from "react";
import { View, StyleSheet, Text, StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  useFonts,
  Comfortaa_400Regular,
  Comfortaa_300Light,
  Comfortaa_500Medium,
  Comfortaa_600SemiBold,
  Comfortaa_700Bold,
} from "@expo-google-fonts/comfortaa";
import { Poppins_400Regular } from "@expo-google-fonts/poppins";
import TypeWriterComponent from "./common/TypeWriter";

const SplashScreen = ({ navigation }: { navigation: any }) => {
  const [fontsLoaded] = useFonts({
    Comfortaa_300Light,
    Comfortaa_400Regular,
    Comfortaa_500Medium,
    Comfortaa_600SemiBold,
    Comfortaa_700Bold,
    Poppins_400Regular,
  });

  useEffect(() => {
    const navigateToSignUp = () => navigation.navigate("SignUpScreen");
    const timer = setTimeout(navigateToSignUp, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <LinearGradient colors={["#00C6FF", "#FF57B9"]} style={styles.gradient}>
        {/* Logo Text */}
        <TypeWriterComponent text="p" text2="icArt" />
        {/* Google Play Badge */}
        <View style={styles.badge}>
          <Text style={styles.badgeTxt}>Google Play</Text>
          <Text style={styles.badgeTxt2}>Editors' Choice</Text>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    alignItems: "center",
  },
  badge: {
    position: "absolute",
    bottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeTxt: {
    color: "white",
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
  },
  badgeTxt2: {
    color: "white",
    fontSize: 24,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
  },
});

export default SplashScreen;
