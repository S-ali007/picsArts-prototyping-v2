import React from "react";
import { View, Text, Switch, StyleSheet } from "react-native";

interface ComfartScreenProps {
  isComfortEnabled: boolean;
  onToggleComfort: (value: boolean) => void;
}

const ComfartScreen: React.FC<ComfartScreenProps> = ({
  isComfortEnabled,
  onToggleComfort,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comfort Settings</Text>
      <View style={styles.setting}>
        <Text style={styles.settingText}>Enable Comfort Mode</Text>
        <Switch value={isComfortEnabled} onValueChange={onToggleComfort} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  setting: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  settingText: {
    fontSize: 18,
  },
});

export default ComfartScreen;
