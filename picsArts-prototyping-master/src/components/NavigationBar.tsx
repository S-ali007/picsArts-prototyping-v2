import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const NavigationBar = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.navBar}>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate("Home")}
      >
        <FontAwesome name="compass" size={32} color="grey" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate("Discover")}
      >
        <FontAwesome name="user" size={24} color="grey" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate("CreateMain")}
      >
        <View
          style={{
            backgroundColor: "#FF00FF",
            alignItems: "center",
            paddingVertical: 10,
            paddingHorizontal: 13,
            borderRadius: 50,
          }}
        >
          <FontAwesome name="plus" size={24} color="#fff" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate("Challenges")}
      >
        <FontAwesome name="trophy" size={24} color="grey" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate("Profile")}
      >
        <FontAwesome name="user" size={24} color="grey" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    paddingVertical: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: 12,
    color: "black",
  },
});

export default NavigationBar;
