import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const UsernameScreen = ({ navigation }: { navigation: any }) => {
  const [username, setUsername] = useState("");

  const handleClear = () => {
    setUsername("");
  };
  const handleSignUpComplete = () => {
    navigation.navigate("InterestScreen");
  };
  return (
    <View style={styles.container}>
      {/* Progress Indicator */}
      <View style={styles.progress}>
        <View style={styles.activeDot}></View>
        <View style={styles.activeDot}></View>
        <View style={styles.activeDot}></View>
      </View>

      {/* Main Text */}
      <Text style={styles.heading}>Let's pick you a username!</Text>

      {/* Username Input */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Username"
          placeholderTextColor="#999"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />
        {username.length > 0 && (
          <TouchableOpacity onPress={handleClear} style={styles.icon}>
            <Ionicons name="refresh" size={24} color="#999" />
          </TouchableOpacity>
        )}
      </View>

      {/* Complete Button */}
      <TouchableOpacity
        onPress={handleSignUpComplete}
        style={[
          styles.completeButton,
          username ? styles.completeButtonActive : {},
        ]}
        disabled={!username}
      >
        <Text style={styles.completeButtonText}>COMPLETE</Text>
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
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 10,
    textAlign: "center",
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
  completeButton: {
    width: "100%",
    maxWidth: 300,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "#d3d3d3",
  },
  completeButtonActive: {
    backgroundColor: "#FF00FF",
  },
  completeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default UsernameScreen;
