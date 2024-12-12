import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  TextInput,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import api from "../api";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";

const { width, height } = Dimensions.get("window");

type RootStackParamList = {
  ResultComponent: {
    images: string[];
    prompt: string;
  };
};

type GlifScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ResultComponent"
>;

const Glif: React.FC = () => {
  const navigation = useNavigation<GlifScreenNavigationProp>();
  const [loading, setLoading] = useState(false);
  const [customPrompt, setCustomPrompt] = useState<string>("");
  const [result, setResult] = useState<string | null>(null);

  const handleTrain = async () => {
    if (!customPrompt.trim()) {
      Alert.alert("Error", "Please enter a valid prompt!");
      return;
    }

    Alert.alert(
      "Confirmation",
      "Do you want to start training your model?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            setLoading(true);
            setResult(null);
            try {
              const response = await api.post("/api/v1/prompting", {
                data: customPrompt,
              });

              const { fluxResponse, timings } = response.data;
              const images = fluxResponse;
              // Navigate to the ResultComponent screen with parameters
              navigation.navigate("ResultComponent", {
                images,
                prompt: customPrompt,
              });
            } catch (error) {
              console.error("Error:", error);
              Alert.alert(
                "Error",
                "An error occurred while starting training."
              );
            } finally {
              setLoading(false);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      {/* Input for custom prompt */}
      <Text style={styles.label}>Enter Custom Prompt:</Text>
      <TextInput
        style={styles.input}
        placeholder="Type your prompt here..."
        value={customPrompt}
        onChangeText={setCustomPrompt}
      />

      {/* Train Button */}
      <TouchableOpacity
        style={styles.trainButton}
        onPress={handleTrain}
        disabled={loading}
      >
        {loading ? (
          <Text style={styles.buttonText}>Processing...</Text>
        ) : (
          <Text style={styles.buttonText}>Start Training</Text>
        )}
      </TouchableOpacity>

      {/* Display the result */}
      {result && (
        <View>
          <Image source={{ uri: result }} style={styles.resultImage} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#cccccc",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#ffffff",
    marginBottom: 20,
  },
  trainButton: {
    marginTop: 20,
    paddingVertical: 15,
    backgroundColor: "#FF00FF",
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  resultImage: {
    width: "100%",
    height: "75%",
  },
});

export default Glif;
