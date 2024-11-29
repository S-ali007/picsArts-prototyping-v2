import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import TypeWriterComponent from "./common/TypeWriter";
import * as Google from "expo-auth-session/providers/google";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "@/firebaseConfig";

const SignUpScreen = ({ navigation }: { navigation: any }) => {
  const handleArrowPress = () => {
    navigation.navigate("WelcomeScreen");
  };
  const handleSignInPress = () => {
    navigation.navigate("SignInScreen");
  };
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:
      "31861485972-g0uqsk2ckhp1fohueniru2do6f1oqdum.apps.googleusercontent.com",
    redirectUri: "https://auth.expo.io/@safi.dev992/picsart",
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      const accessToken = response.authentication?.accessToken;

      const credential = GoogleAuthProvider.credential(accessToken);

      signInWithCredential(auth, credential)
        .then((userCredential) => {
          Alert.alert("Success", "Logged in successfully!");
          console.log("User info:", userCredential.user);
        })
        .catch((error) => {
          Alert.alert("Error", error.message);
          console.error("Error signing in:", error);
        });
    }
  }, [response]);
  return (
    <LinearGradient colors={["#3afed6", "#FF57B9"]} style={styles.gradient}>
      <ImageBackground
        source={require("../assets/backgroundImage2.png")}
        style={styles.background}
      >
        <View style={styles.logo}>
          <TypeWriterComponent text="p" text2="icsArt" />
        </View>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.createAccountButton}
            onPress={() => handleArrowPress()}
          >
            <Text style={styles.createAccountText}>CREATE AN ACCOUNT</Text>
          </TouchableOpacity>
          <Text style={styles.orText}>or connect with</Text>
          <View style={styles.socialButtons}>
            <TouchableOpacity
              style={styles.socialButton}
              disabled={!request}
              onPress={() => {
                promptAsync();
              }}
            >
              <FontAwesome name="google" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <FontAwesome name="facebook" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <Text style={styles.termsText}>
            By registering you agree to our
            <Text style={styles.linkText}> Terms of Use </Text>
            and
            <Text style={styles.linkText}> Privacy Policy</Text>
          </Text>
          <View style={styles.accountMain}>
            <Text style={styles.accountTxt}>Already have an account?</Text>
            <TouchableOpacity onPress={() => handleSignInPress()}>
              <Text style={styles.signInText}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    marginTop: "auto",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: "20%",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  createAccountButton: {
    backgroundColor: "#FF00FF",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 10,
    alignItems: "center",
  },
  createAccountText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  orText: {
    color: "white",
    marginBottom: 10,
    fontSize: 18,
  },
  socialButtons: {
    flexDirection: "row",
    marginBottom: 20,
  },
  socialButton: {
    backgroundColor: "#3b5998",
    padding: 10,
    borderRadius: 25,
    marginHorizontal: 10,
    display: "flex",
    alignItems: "center",
    width: 45,
  },
  termsText: {
    color: "white",
    textAlign: "center",
    marginBottom: 25,
    fontSize: 18,
    paddingHorizontal: 40,
  },
  accountMain: {
    flexDirection: "row",
    gap: 10,
    fontSize: 18,
    marginTop: 30,
  },
  accountTxt: {
    fontSize: 18,
    color: "white",
  },
  linkText: {
    color: "#00FFFF",
    fontSize: 18,
    textDecorationLine: "underline",
  },
  signInText: {
    color: "#00FFFF",
    textDecorationLine: "underline",
    fontSize: 18,
  },
});

export default SignUpScreen;
