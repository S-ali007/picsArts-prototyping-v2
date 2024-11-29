import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

interface ThemeScreenProps {
  onThemeSelect: (theme: string) => void;
}

const ThemeScreen: React.FC<ThemeScreenProps> = ({ onThemeSelect }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose a Theme</Text>
      <Button title="Light Theme" onPress={() => onThemeSelect("light")} />
      <Button title="Dark Theme" onPress={() => onThemeSelect("dark")} />
      <Button title="System Default" onPress={() => onThemeSelect("system")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default ThemeScreen;
