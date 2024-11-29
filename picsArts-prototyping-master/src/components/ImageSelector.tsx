import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Platform,
  ScrollView,
  Dimensions,
  TextInput,
  Linking,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import api from "../api";

const { width, height } = Dimensions.get("window");

interface ImageSelectorProps {
  navigation: any;
}

const ImageSelector: React.FC<ImageSelectorProps> = ({ navigation }) => {
  const [images, setImages] = useState<string[]>([]);
  const [modelName, setModelName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [privacyOption, setPrivacyOption] = useState<string>("Public");
  const [gender, setGender] = useState<string>("");

  const requestPermission = async (): Promise<boolean> => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Required", "We need access to your photos.", [
          { text: "Settings", onPress: () => Linking.openSettings() },
          { text: "Cancel", style: "cancel" },
        ]);
        return false;
      }
    }
    return true;
  };

  const pickImages = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) return;

    if (images.length >= 25) {
      Alert.alert("Limit Reached", "You can only select up to 25 images.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImages = result.assets
        .slice(0, 25 - images.length)
        .map((asset) => asset.uri);

      setImages((prevImages) => [...prevImages, ...selectedImages]);
    }
  };
  console.log(images);
  const handleNext = async () => {
    if (
      images.length > 0 &&
      modelName.trim() &&
      description.trim() &&
      (privacyOption === "Public" || gender)
    ) {
      try {
        const formData = new FormData();

        // Append images to FormData
        images.forEach((uri, index) => {
          const file = {
            uri,
            name: `image_${index}.jpg`, // Ensure unique names for files
            type: "image/jpeg", // Adjust type if images might have other formats
          };
          formData.append("image", file as any); // Key must match the server's expected field name
        });

        // // Append additional fields
        // formData.append("modelName", modelName);
        // formData.append("description", description);
        // formData.append("privacyOption", privacyOption);
        if (privacyOption === "Private") {
          formData.append("gender", gender);
        }

        // Make API request
        const response = await api.post("/fine-tune", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(response, "response");
        // Navigate to the next screen on success
        // navigation.navigate("Fal", {
        //   images,
        //   modelName,
        //   description,
        //   privacyOption,
        //   gender,
        // });
      } catch (error: any) {
        console.error("Error uploading images:", error);

        // Display appropriate error messages
        if (error.response) {
          Alert.alert(
            "Error",
            error.response.data.detail || "An error occurred on the server."
          );
        } else {
          Alert.alert("Error", "Something went wrong. Please try again.");
        }
      }
    } else {
      Alert.alert(
        "Incomplete",
        "Please complete all fields and select at least one image."
      );
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>Enter Model Details</Text>
          <TextInput
            style={styles.input}
            placeholder="Model Name"
            value={modelName}
            onChangeText={setModelName}
          />
          <TextInput
            style={styles.textArea}
            placeholder="Description"
            multiline
            numberOfLines={4}
            value={description}
            onChangeText={setDescription}
          />
          <Picker
            selectedValue={privacyOption}
            onValueChange={(itemValue) => setPrivacyOption(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Public" value="Public" />
            <Picker.Item label="Private" value="Private" />
          </Picker>
          {privacyOption === "Private" && (
            <View style={styles.genderContainer}>
              <Text style={styles.genderTitle}>Gender:</Text>
              <TouchableOpacity
                style={[
                  styles.genderOption,
                  gender === "Male" && styles.genderSelected,
                ]}
                onPress={() => setGender("Male")}
              >
                <Text
                  style={[
                    styles.genderText,
                    gender === "Male" && styles.genderSelectedText,
                  ]}
                >
                  Male
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.genderOption,
                  gender === "Female" && styles.genderSelected,
                ]}
                onPress={() => setGender("Female")}
              >
                <Text
                  style={[
                    styles.genderText,
                    gender === "Female" && styles.genderSelectedText,
                  ]}
                >
                  Female
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <Text style={styles.subtitle}>Select Images</Text>
        <View style={styles.imageGrid}>
          {images.map((uri, index) => (
            <Image key={index} source={{ uri }} style={styles.image} />
          ))}
          {images.length < 25 && (
            <TouchableOpacity onPress={pickImages} style={styles.addImage}>
              <Text style={styles.addImageText}>+</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={[
          styles.submitButton,
          images.length > 0 && modelName && description
            ? styles.submitButtonActive
            : {},
        ]}
        onPress={handleNext}
        disabled={images.length === 0 || !modelName || !description}
      >
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    marginVertical: 10,
  },
  detailsContainer: {
    marginBottom: 20,
  },
  input: {
    padding: 12,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
  },
  textArea: {
    height: 100,
    padding: 12,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    textAlignVertical: "top",
  },
  picker: {
    marginBottom: 12,
  },
  genderContainer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-around",
  },
  genderTitle: {
    fontSize: 16,
    color: "#333",
  },
  genderOption: {
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
  },
  genderSelected: {
    backgroundColor: "#FF00FF",
  },
  genderText: {
    color: "#333",
  },
  genderSelectedText: {
    color: "#fff",
  },
  imageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
  addImage: {
    width: 100,
    height: 100,
    backgroundColor: "#eaeaea",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  addImageText: {
    fontSize: 24,
    color: "#999",
  },
  submitButton: {
    marginTop: 15,
    marginBottom: 85,
    paddingVertical: 15,
    backgroundColor: "#eaeaea", // Default color when disabled
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  submitButtonActive: {
    backgroundColor: "#FF00FF", // Active button color
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ImageSelector;
