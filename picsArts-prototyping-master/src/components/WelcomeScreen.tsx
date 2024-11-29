import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
interface Props {
  navigation: {
    navigate: (screen: string, params?: { email: string }) => void;
  };
}

const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState<string>("");
  const [validEmail, setValidEmail] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSendSignInLink = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      try {
        await AsyncStorage.setItem("emailForSignIn", email);

        navigation.navigate("PasswordScreen", { email });
      } catch (error: any) {
        setErrorMessage(error.message);
        console.log(error.message);
      }
    } else {
      setValidEmail(false);
    }
  };

  const handleEmailChange = (input: string) => {
    setEmail(input);
    setValidEmail(true);
    setErrorMessage("");
  };

  return (
    <View style={styles.container}>
      {/* Main Text */}
      <Text style={styles.heading}>Hi there!</Text>
      <Text style={styles.subheading}>Enter your email address</Text>

      {/* Input Field */}
      <TextInput
        placeholder="Enter your email"
        placeholderTextColor="#999"
        style={styles.input}
        keyboardType="email-address"
        onChangeText={handleEmailChange}
        value={email}
      />

      {/* Error Message */}
      {!validEmail && (
        <Text style={styles.errorText}>Please enter a valid email address</Text>
      )}
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

      {/* Next Button */}
      <TouchableOpacity
        style={[
          styles.nextButton,
          email ? styles.completeButtonActive : styles.nextButtonDisabled,
        ]}
        onPress={handleSendSignInLink}
        disabled={!email}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 10,
  },
  subheading: {
    fontSize: 20,
    color: "#333",
    marginBottom: 15,
  },
  input: {
    width: "100%",
    maxWidth: 300,
    padding: 12,
    marginVertical: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 16,
    color: "#333",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
  completeButtonActive: {
    backgroundColor: "#FF00FF",
  },
  nextButton: {
    width: "100%",
    maxWidth: 300,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  nextButtonDisabled: {
    backgroundColor: "#d3d3d3",
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default WelcomeScreen;
