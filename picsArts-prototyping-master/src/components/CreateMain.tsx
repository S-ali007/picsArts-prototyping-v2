import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
  Platform,
  Button,
  Linking,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { RootStackParamList } from "../app/navigation/AppNavigator";
import ImageSelector from "./ImageSelector";
import Glif from "./Glif";
import RemoveBackground from "./RemoveBackground";
// import GestureScreen from "./GestureScreen";

interface CreateScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, "CreateMain">;
}

const CreateMain: React.FC<CreateScreenProps> = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState("Training Model");

  const handleTabSelect = (tab: string) => {
    setSelectedTab(tab);
  };

  const [imageUri, setImageUri] = useState<string | null>(null);
  const [tool, setTool] = useState("");

  const handlePermissionRequest = async (): Promise<boolean> => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "We need permission to access your photos.",
          [
            {
              text: "Go to Settings",
              onPress: () => Linking.openSettings(),
            },
            { text: "Cancel", style: "cancel" },
          ]
        );
        return false;
      }
      return true;
    }
    return true;
  };

  const pickImage = async () => {
    const hasPermission = await handlePermissionRequest();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
      }
    } catch (error) {
      console.log("Error picking image:", error);
    }
  };
  const handleToolClick = (tool: string) => {
    if (tool === "Remove background") {
      return setTool(tool);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Text style={styles.closeIcon}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Create</Text>
        <TouchableOpacity style={styles.proButtonDiv}>
          <Text style={styles.proButton}>Try PRO</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name="search" />
        </TouchableOpacity>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabs}>
        {["Training Model", "Prompting", "Photos", "Templates"].map((tab) => (
          <TouchableOpacity key={tab} onPress={() => handleTabSelect(tab)}>
            <Text
              style={[styles.tabText, selectedTab === tab && styles.activeTab]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {selectedTab === "Photos" && (
        <>
          {tool === "Remove background" ? (
            <View>
              <RemoveBackground />
            </View>
          ) : (
            <>
              {/* Permission Request */}
              {selectedTab === "Photos" && (
                <View style={styles.permissionRequest}>
                  <Button
                    title="Pick an image from storage"
                    onPress={pickImage}
                  />
                  {imageUri && (
                    <Image
                      source={{ uri: imageUri }}
                      style={{ width: 400, height: 400, marginTop: 20 }}
                    />
                  )}
                </View>
              )}

              {/* Tools */}
              <View style={styles.toolsContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {tools.map((tool, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.toolItem}
                      onPress={() => handleToolClick(tool.name)}
                    >
                      <Image
                        source={{ uri: tool.image }}
                        style={styles.toolImage}
                      />
                      <Text style={styles.toolText}>{tool.name}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {/* AI Tools Section */}
              <Text style={styles.sectionTitle}>AI Tools</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.aiTools}
              >
                {aiTools.map((tool, index) => (
                  <View key={index} style={styles.aiToolItem}>
                    <Image
                      source={{ uri: tool.image }}
                      style={styles.aiToolImage}
                    />
                    <Text style={styles.toolText}>{tool.name}</Text>
                  </View>
                ))}
              </ScrollView>
            </>
          )}
        </>
      )}

      {selectedTab === "Training Model" && (
        <View>
          <ImageSelector navigation={navigation} />
        </View>
      )}
      {selectedTab === "Prompting" && (
        <View>
          <Glif />
        </View>
      )}
      {selectedTab === "Draw & Color" && <View>{/* <GestureScreen /> */}</View>}
    </View>
  );
};

const tools = [
  {
    name: "Blank",
    image:
      "https://as1.ftcdn.net/v2/jpg/02/57/42/72/1000_F_257427286_Lp7c9XdPnvN46TyFKqUaZpPADJ77ZzUk.jpg",
  },
  {
    name: "Add text",
    image:
      "https://static.brusheezy.com/system/resources/previews/000/066/430/non_2x/streaming-service-style-text-effect-photoshop-brushes.jpg",
  },
  {
    name: "Remove ",
    image:
      "https://plugins-media.makeupar.com/smb/blog/post/2024-01-31/0d224f70-aff0-4865-82d6-8b6a68e7a289.jpg",
  },
  {
    name: "Remove background",
    image:
      "https://static.fotor.com/app/features/img/step_new/features/1-Protrait.png",
  },
];

const aiTools = [
  {
    name: "DALLE·3",
    image:
      "https://images.ctfassets.net/lzny33ho1g45/75DSS8gsgXORvalbs3MCyE/4e646f4879d46e9d1b6f76b3071bb6d8/image2.jpg",
  },
  {
    name: "Midjourney",
    image:
      "https://images.ctfassets.net/lzny33ho1g45/5c2lxK4vhLWzfata4t1eul/9f6a8cb7f265d574dd589015e00f21c2/image10.jpeg",
  },
  {
    name: "Ideogram",
    image:
      "https://images.ctfassets.net/lzny33ho1g45/7xaiByWYInfO3qQnxkpn9O/fee0e5e299a729031f8f77dbef05f73f/image8.jpeg",
  },
  {
    name: "Stable Diffusion",
    image:
      "https://images.ctfassets.net/lzny33ho1g45/4Az7EJ5gtpVyQYpyk3J7AX/c71372702c29aeff37a974d2fc857553/image7.jpeg",
  },
  {
    name: "FLUX.1",
    image:
      "https://images.ctfassets.net/lzny33ho1g45/7c3OAOL5z26Tt45bzCynw4/75ec29b9cce1b74ad369e4457ca0cbb7/image4.jpeg",
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: "#E0E0E0",
  },
  closeIcon: {
    fontSize: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
  },
  proButtonDiv: {
    borderColor: "#E0E0E0",
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  proButton: {
    color: "#7B1FA2",
    fontWeight: "bold",
  },
  searchIcon: {
    fontSize: 20,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  tabText: {
    fontSize: 16,
    color: "#888888",
  },
  activeTab: {
    color: "#7B1FA2",
    fontWeight: "bold",
    borderBottomWidth: 2,
    borderBottomColor: "#7B1FA2",
  },
  permissionRequest: {
    alignItems: "center",
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  permissionText: {
    fontSize: 16,
    color: "#888888",
    textAlign: "center",
    marginBottom: 10,
  },
  requestButton: {
    backgroundColor: "#7B1FA2",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  requestButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  toolsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  toolItem: {
    alignItems: "center",
    marginRight: 16,
  },
  toolImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginBottom: 4,
  },
  toolText: {
    fontSize: 12,
    color: "#555555",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 16,
    marginTop: 20,
  },
  aiTools: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  aiToolItem: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginRight: 10,
  },
  aiToolImage: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
  },
});

export default CreateMain;
