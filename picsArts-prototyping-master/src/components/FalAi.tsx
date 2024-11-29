import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
  Dimensions,
  Image,
} from "react-native";
import "text-encoding";
import api from "../api";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../app/navigation/AppNavigator";
import axios from "axios";
import * as FileSystem from "expo-file-system";

const { width, height } = Dimensions.get("window");

type ImageData = {
  uri: string;
};

type RouteParams = {
  images: ImageData[];
  modelName: string;
  description: string;
  privacyOption: string;
  gender: string;
};

type ModelListProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Fal">;
  route: { params: RouteParams };
};

const Fal: React.FC<ModelListProps> = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const [steps, setSteps] = useState<string>("50");
  const [result, setResult] = useState<any | null>(null);

  const { images, modelName, description, privacyOption, gender } =
    route.params;

  const handleTrain = async () => {
    if (!images || images.length === 0) {
      Alert.alert("Error", "Please provide valid images!");
      return;
    }

    if (isNaN(parseInt(steps, 10)) || parseInt(steps, 10) <= 0) {
      Alert.alert("Error", "Please provide a valid number of steps.");
      return;
    }

    setLoading(true);

    try {
    console.log("Image file path:", images);

      // Convert the image URIs to Base64
      const imagesBase64 = await Promise.all(
        images.map(async (image) => {
          if (!image.uri) {
            throw new Error("Image URI is missing");
          }
          const base64 = await FileSystem.readAsStringAsync(image.uri, {
            encoding: FileSystem.EncodingType.Base64,
          });
          return `data:image/jpeg;base64,${base64}`; // Assuming JPEG format
        })
      );
      

      // API request payload
      const payload = {
        images_data_url: imagesBase64.join(","), // Join Base64 images into a single string
        create_masks: true, // Default value
        steps: parseInt(steps, 10),
      };

      // Call the fine-tuning API
      const response = await api.post("/fine-tune", payload);

      setResult(response.data);

      Alert.alert("Success", "Model training started successfully!");
    } catch (error: any) {
      console.error("API Error:", error);

      if (error.response) {
        console.error("API Error Response:", error.response);
        Alert.alert(
          "Error",
          `An error occurred while training the model: ${
            error.response.data.message || error.message
          }`
        );
      } else {
        Alert.alert(
          "Error",
          `An error occurred: ${error.message || "Unknown error"}`
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Fal AI LoRA Fine-Tuning</Text>

      {/* Display Model Details */}
      <Text style={styles.modelInfo}>Model Name: {modelName}</Text>
      <Text>Description: {description}</Text>
      <Text>Privacy: {privacyOption}</Text>
      <Text>Gender: {gender}</Text>

      {/* Input Fields */}
      {/* <TextInput
        style={styles.input}
        placeholder="Number of Steps (default: 1000)"
        value={steps}
        keyboardType="numeric"
        onChangeText={setSteps}
      /> */}

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

      {/* Display Result */}
      {result && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Training Completed!</Text>
          <Image
            source={{ uri: result.diffusers_lora_file.url }}
            style={styles.resultImage}
          />
          <Text style={styles.resultText}>
            Config File: {result.config_file.url}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f8f9fa",
    width,
    height,
  },
  label: { fontSize: 18, fontWeight: "700", marginBottom: 15 },
  modelInfo: { fontSize: 16, marginBottom: 15 },
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
  buttonText: { color: "#ffffff", fontSize: 16, fontWeight: "bold" },
  resultContainer: { marginTop: 20 },
  resultText: { fontSize: 16, marginBottom: 10 },
  resultImage: { width: "100%", height: 200, marginBottom: 10 },
});

export default Fal;
