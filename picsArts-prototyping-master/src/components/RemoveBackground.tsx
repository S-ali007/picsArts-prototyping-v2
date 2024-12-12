import React, { useState } from "react";
import {
  View,
  Button,
  Image,
  Alert,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import api from "../api";
const { width, height } = Dimensions.get("window");

const RemoveBackground = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [processedImage, setProcessedImage] = useState(null);

  const handlePickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Error", "Unable to access image library. Please try again.");
      console.error("Image Picker Error:", error);
    }
  };

  const handleRemoveBackground = async () => {
    if (!selectedImage) {
      Alert.alert("No Image Selected", "Please select an image to proceed.");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", {
        uri: selectedImage,
        name: "selected_image.jpg",
        type: "image/jpeg",
      });

      const response = await api.post("/api/v1/removeBackground", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      Alert.alert("Success", "Background removed successfully!");
      console.log("Response:", response.data);
      setProcessedImage(response.data.imageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);

      if (error.response) {
        Alert.alert(
          "Error",
          error.response.data.message || "An error occurred on the server."
        );
      } else {
        Alert.alert("Error", "Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Remove Image Background</Text>

      {selectedImage && (
        <>
          <Text style={styles.resultHeader}>Original Image:</Text>
          <Image source={{ uri: selectedImage }} style={styles.image} />
        </>
      )}

      {processedImage && (
        <>
          <Text style={styles.resultHeader}>Processed Image:</Text>
          <Image source={{ uri: processedImage }} style={styles.image} />
        </>
      )}

      {isLoading && <ActivityIndicator size="large" color="#FF00FF" />}

      <View style={styles.buttonContainer}>
    <TouchableOpacity style={styles.button} onPress={handlePickImage}>
      <Text style={styles.buttonText}>Select Image</Text>
    </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, !selectedImage && styles.disabledButton]}
          onPress={handleRemoveBackground}
          disabled={!selectedImage || isLoading}
        >
          <Text style={styles.buttonText}>Remove Background</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F8F9FA",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#343A40",
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 15,
    borderRadius: 15,
    borderColor: "#6C757D",
    borderWidth: 1,
  },
  resultHeader: {
    fontSize: 18,
    fontWeight: "600",
    color: "#495057",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#FF00FF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "#6C757D",
  },
});

export default RemoveBackground;
