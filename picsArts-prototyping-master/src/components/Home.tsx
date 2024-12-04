import React from "react";
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import { RootStackParamList } from "../app/navigation/AppNavigator";
import {
  Comfortaa_400Regular,
  Comfortaa_300Light,
  Comfortaa_500Medium,
  Comfortaa_600SemiBold,
  Comfortaa_700Bold,
  useFonts,
} from "@expo-google-fonts/comfortaa";
import AppLoading from "expo-app-loading";

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;

const Home: React.FC<HomeScreenProps> = ({ navigation, route }) => {
  let [fontsLoaded] = useFonts({
    Comfortaa_400Regular,
    Comfortaa_300Light,
    Comfortaa_500Medium,
    Comfortaa_600SemiBold,
    Comfortaa_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerText}>GenArt</Text>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()} >
          <Text style={styles.iconText}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* Hero Section */}
      <ImageBackground
        source={{
          uri: "https://cdn.usegalileo.ai/sdxl10/b5e1c8ba-17f9-48e4-8e4c-25757d7d6b10.png",
        }}
        style={styles.hero}
      >
        <Text style={styles.heroTitle}>
          Your all-in-one AI-photo and video Generator
        </Text>
        <Text style={styles.heroSubtitle}>
          Get the creative tools, AI-powered effects, and a community of artists
          to help you become the best creator.
        </Text>
        <TouchableOpacity style={styles.heroButton}>
          <Text
            style={styles.heroButtonText}
            onPress={() => navigation.navigate("CreateMain")}
          >
            Start Creating
          </Text>
        </TouchableOpacity>
      </ImageBackground>

      {/* Recent Models Section */}
      <Text style={styles.popularToolsTitle}>Recent Models</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.toolCards}
      >
        {models.map((model, index) => (
          <View key={index} style={styles.toolCard}>
            <Image source={{ uri: model.image }} style={styles.toolImage} />
            <Text style={styles.toolName}>{model.name}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Explore More Section */}
      <Text style={styles.popularToolsTitle}>Explore More</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.toolCards}
      >
        {exploreMore.map((exploreMore, index) => (
          <View key={index} style={styles.toolCard}>
            <Image
              source={{ uri: exploreMore.image }}
              style={styles.toolImage}
            />
            <Text style={styles.toolName}>{exploreMore.name}</Text>
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  );
};

const models = [
  {
    name: "Model 1",
    image:
      "https://images.ctfassets.net/lzny33ho1g45/3ihdtA721SdY4U4EkawoZg/6198d6df90c3ffe6797bc05ba13c7f8b/image9.png",
  },
  {
    name: "Model 2",
    image:
      "https://cdn.sanity.io/images/599r6htc/regionalized/c87b9b526653b43596c015c808a54c2dc6e323d1-4240x2000.png",
  },
  { name: "Model 3", image: "https://img6.arthub.ai/64bd3aa9-b195.webp" },
];

const exploreMore = [
  {
    name: "Generative Art Model",
    image:
      "https://d11kvfv4kxw5s4.cloudfront.net/wp-content/uploads/sites/15/2019/10/06134809/shlomi-with-camera.jpg",
  },
  {
    name: "Video Model",
    image:
      "https://fixthephoto.com/images/content/kapwing-video-resizer-app.png",
  },
  {
    name: "Sketch Model",
    image:
      "https://static.xsbapp.com/market-operations/market/side/1717149190348.png?x-oss-process=image/resize,w_1120,h_746,type_6/interlace,1,image/format,webp",
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
    padding: 16,
    backgroundColor: "#F6F8FA",
  },
  headerText: {
    fontSize: 20,
    color: "#000",
    fontFamily: "Comfortaa_700Bold",
  },
  iconText: {
    fontSize: 24,
  },
  hero: {
    height: 340,
    justifyContent: "flex-end",
    padding: 20,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
    fontFamily: "Comfortaa_700Bold",
  },
  heroSubtitle: {
    fontSize: 14,
    color: "#FFFFFF",
    marginTop: 5,
    marginBottom: 20,
    fontFamily: "Comfortaa_400Regular",
  },
  heroButton: {
    marginTop: 40,
    backgroundColor: "#0D80F2",
    paddingVertical: 10,
    borderRadius: 10,
    maxWidth: 134,
    width: "100%",
  },
  heroButtonText: {
    textAlign: "center",
    fontSize: 14,
    color: "#FFFFFF",
    fontFamily: "Comfortaa_500Medium",
  },
  popularToolsTitle: {
    padding: 16,
    fontSize: 20,
    fontWeight: "600",
    fontFamily: "Comfortaa_600SemiBold",
  },
  toolCards: {
    paddingLeft: 16,
  },
  toolCard: {
    alignItems: "center",
    backgroundColor: "#F6F8FA",
    borderRadius: 8,
    marginRight: 16,
    paddingBottom: 10,
  },
  toolImage: {
    width: 240,
    height: 160,
    marginBottom: 8,
    borderRadius: 5,
  },
  toolName: {
    fontSize: 14,
    textAlign: "center",
    fontFamily: "Comfortaa_400Regular",
  },
});

export default Home;
