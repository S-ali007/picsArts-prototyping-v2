import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { RouteProp } from "@react-navigation/native";

// Define the parameters for the specific route
type RouteParams = {
  email: string;
};

// Define a type for your navigator's param list
type AuthStackParamList = {
  PasswordScreen: RouteParams;
  UsernameScreen: undefined; // Assuming this screen doesn't require params
};

// Use this type to define the route
const PasswordScreen = ({ navigation }: { navigation: any }) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  // Use the route with the correct type
  const route = useRoute<RouteProp<AuthStackParamList, "PasswordScreen">>();
  const email = route.params?.email;

  const isPasswordValid = (): boolean => {
    const hasMinLength = password.length >= 8 && password.length <= 16;
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    return hasMinLength && hasLetter && hasNumber;
  };

  const handleSignUp = () => {
    if (email && password) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          setMessage("User registered successfully!");
          // Optionally navigate to the next screen
          navigation.navigate("UsernameScreen");
        })
        .catch((error) => {
          setMessage(error.message);
          console.log(error.message);
        });
    } else {
      setMessage("Email or password is missing");
    }
  };

  return (
    <View style={styles.container}>
      {/* Progress Indicator */}
      <View style={styles.progress}>
        <View style={styles.activeDot}></View>
        <View style={styles.activeDot}></View>
        <View style={styles.inactiveDot}></View>
      </View>

      {/* Main Text */}
      <Text style={styles.heading}>Secure It With A Password</Text>
      <Text style={styles.subheading}>Your password must contain:</Text>

      {/* Password Requirements */}
      <View style={styles.requirements}>
        <Text style={styles.requirement}>• 8 to 16 characters</Text>
        <Text style={styles.requirement}>• At least one letter</Text>
        <Text style={styles.requirement}>• At least one number</Text>
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Minimum 8 characters"
          placeholderTextColor="#999"
          style={styles.input}
          secureTextEntry={!showPassword}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.icon}
        >
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={24}
            color="#999"
          />
        </TouchableOpacity>
      </View>

      {/* Error Message */}
      {message && <Text style={styles.errorText}>{message}</Text>}

      {/* Next Button */}
      <TouchableOpacity
        onPress={handleSignUp}
        style={[
          styles.nextButton,
          isPasswordValid() ? styles.nextButtonActive : {},
        ]}
        disabled={!isPasswordValid()}
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
  progress: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 20,
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#c870f0",
  },
  inactiveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#d3d3d3",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 10,
    textAlign: "center",
  },
  subheading: {
    fontSize: 18,
    color: "#333",
    marginBottom: 15,
  },
  requirements: {
    alignItems: "flex-start",
    width: "100%",
    maxWidth: 300,
    marginBottom: 20,
  },
  requirement: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  inputContainer: {
    width: "100%",
    maxWidth: 300,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 20,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#333",
  },
  icon: {
    padding: 5,
  },
  nextButton: {
    width: "100%",
    maxWidth: 300,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "#d3d3d3",
  },
  nextButtonActive: {
    backgroundColor: "#FF00FF",
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
});

export default PasswordScreen;
