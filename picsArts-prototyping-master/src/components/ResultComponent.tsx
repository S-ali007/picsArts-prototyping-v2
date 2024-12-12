import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { RouteProp } from "@react-navigation/native";

const { width } = Dimensions.get("window");

export type RootStackParamList = {
  ResultComponent: {
    images: Array<{
      url: string;
      width: number;
      height: number;
      content_type: string;
    }>;
    prompt: string;
  };
};

type ResultComponentRouteProp = RouteProp<
  RootStackParamList,
  "ResultComponent"
>;

type Props = {
  route: ResultComponentRouteProp;
};

const images = [
  {
    url: "https://res.cloudinary.com/dqmzbj8kt/image/upload/v1732552282/fvwzWjRveUApgvJlpBtOF_txwxp3.png",
  },
];

const prompt = "game";

const ResultComponent: React.FC<Props> = ({ route }) => {
  // const { images = [], prompt } = route.params;
  // console.log(images, "images");
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Result for Prompt: "{prompt}"</Text>
      {images.length > 0 && images.length < 2 ? (
        <View>
          {images.map((image, index) => {
            return (
              <View key={index} style={styles.imageContainer}>
                <Image
                  source={{
                    uri: image.url,
                  }}
                  style={styles.image}
                />
              </View>
            );
          })}
        </View>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.toolCards}
        >
          {images.map((image, index) => (
            <View key={index} style={styles.toolCard}>
              <Image
                source={{
                  uri: image.url,
                }}
                style={styles.image}
              />
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  toolCards: {
    // paddingLeft: 16,
  },
  toolCard: {
    alignItems: "center",
    marginRight: 10,
  },
  toolImage: {
    width: 240,
    height: 160,
    marginBottom: 8,
    borderRadius: 5,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  imagesContainer: {
    marginTop: 10,
  },
  imageContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  image: {
    width: width - 80,
    height: 200,
    borderRadius: 8,
  },
  noImagesText: {
    textAlign: "center",
    fontSize: 16,
    color: "#888",
    marginTop: 20,
  },
});

export default ResultComponent;
