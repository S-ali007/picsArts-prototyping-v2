import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import axios from "axios";

type ModelListRouteProp = RouteProp<RootStackParamList, "ModelList">;

interface ModelListProps {
  route: ModelListRouteProp;
}

export type RootStackParamList = {
  ImageSelector: undefined;
  ModelList: {
    modelName: string;
    images: string[];
    description: string;
    privacyOption: string;
    gender?: string;
  };
  TrainingScreen: undefined;
};

const ModelList: React.FC<ModelListProps> = ({ route }) => {
  const { images, modelName, description, privacyOption, gender } =
    route.params;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [loading, setLoading] = useState(false);

  const handleTrain = async () => {
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
            try {
              setLoading(true);

              const s3Urls: string[] = [];

              for (const uri of images) {
                const fileType = uri.split(".").pop() || "jpg";

                const uploadOptions = {
                  method: "POST",
                  url: "https://api.neural.love/v1/upload",
                  headers: {
                    accept: "application/json",
                    "content-type": "application/json",
                    authorization:
                      "Bearer v1.5f3ddbbd606525575b77f8fee63598c5e1049ef9fa6449de49ef7ab3ce46c4f9",
                  },
                  data: {
                    extension: fileType,
                    contentType: `image/${fileType}`,
                  },
                };

                const response = await axios.request(uploadOptions);
                const { url, s3Url } = response.data;

                const imageData = {
                  uri,
                  name: `image.${fileType}`,
                  type: `image/${fileType}`,
                };

                await axios.put(url, imageData, {
                  headers: {
                    "Content-Type": `image/${fileType}`,
                  },
                });

                s3Urls.push(s3Url);
              }

              const processOptions = {
                method: "POST",
                url: "https://api.neural.love/v1/images/process",
                headers: {
                  accept: "application/json",
                  "content-type": "application/json",
                  authorization:
                    "Bearer v1.5f3ddbbd606525575b77f8fee63598c5e1049ef9fa6449de49ef7ab3ce46c4f9",
                },
                data: {
                  files: s3Urls,
                  parameters: {
                    quality_enhance: {
                      multiplier: "4x",
                      noise: true,
                    },
                    image_sharpen: {
                      aggressive: true,
                    },
                    old_photo_restoration: {
                      remove_scratches: true,
                      fix_colors: false,
                    },
                  },
                },
              };
              console.log("first", processOptions);

              // const processResponse = await axios.request(processOptions);
              // const { orderId } = processResponse.data;
              // console.log(`Processing started. Order ID: ${orderId}`);

              // Alert.alert(
              //   "Processing Started",
              //   `Your order ID is: ${orderId}. Please wait 1-2 minutes for results.`
              // );

              // // Step 4: Polling to check the order status
              // const checkOrderStatus = async () => {
              //   try {
              //     const statusResponse = await axios.get(
              //       `https://api.neural.love/v1/images/orders/${orderId}`,
              //       {
              //         headers: {
              //           accept: "application/json",
              //           authorization:
              //             "Bearer v1.5f3ddbbd606525575b77f8fee63598c5e1049ef9fa6449de49ef7ab3ce46c4f9",
              //         },
              //       }
              //     );

              //     const { status } = statusResponse.data;

              //     if (status.isReady) {
              //       Alert.alert(
              //         "Processing Complete",
              //         `Your model has been successfully trained.`
              //       );
              //       console.log("Processing complete:", statusResponse.data);
              //     } else {
              //       console.log("Processing not ready. Retrying...");
              //       setTimeout(checkOrderStatus, 30000);
              //     }
              //   } catch (error) {
              //     console.error("Error checking order status:", error);
              //   }
              // };

              // checkOrderStatus();
            } catch (error) {
              console.error("Error during training process:", error);
              Alert.alert(
                "Error",
                "There was an error during the training process. Please try again."
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
      {/* Display model details */}
      <View style={styles.section}>
        <Text style={styles.label}>Model Name:</Text>
        <Text style={styles.text}>{modelName}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Description:</Text>
        <Text style={styles.text}>{description}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Privacy Option:</Text>
        <Text style={styles.text}>{privacyOption}</Text>
        {privacyOption === "Private" && (
          <View style={styles.genderSection}>
            <Text style={styles.label}>Gender:</Text>
            <Text style={styles.text}>{gender}</Text>
          </View>
        )}
      </View>

      {/* Display the selected images */}
      <Text style={styles.imagesTitle}>Selected Images:</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageGrid}>
          {images.map((uri, index) => (
            <Image key={index} source={{ uri }} style={styles.imageItem} />
          ))}
        </View>
      </ScrollView>

      {/* Train Button */}
      <TouchableOpacity
        style={styles.trainButton}
        onPress={handleTrain}
        disabled={loading} // Disable button while loading
      >
        {loading ? (
          <Text style={styles.buttonText}>Processing...</Text> // Show processing text while loading
        ) : (
          <Text style={styles.buttonText}>Start Training</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f8f9fa",
  },
  section: {
    marginBottom: 13,
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
  },
  text: {
    fontSize: 14,
    color: "#666666",
    marginTop: 4,
  },
  genderSection: {
    marginTop: 8,
  },
  imagesTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333333",
    marginVertical: 10,
  },
  imageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  imageItem: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#dddddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
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
});

export default ModelList;
