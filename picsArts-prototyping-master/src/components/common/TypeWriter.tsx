import React, { useEffect, useRef, useState } from "react";
import { Text, View, StyleSheet } from "react-native";

interface TypeWriterComponentProps {
  text: string;
  text2: string;
  duration?: number;
}

const TypeWriterComponent: React.FC<TypeWriterComponentProps> = ({
  text,
  text2,
  duration = 200,
}) => {
  const [displayText, setDisplayText] = useState("");
  const [displayText2, setDisplayText2] = useState("");
  const typingInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (displayText || displayText2) return;

    let index = 0;
    typingInterval.current = setInterval(() => {
      if (index < text.length) setDisplayText((prev) => prev + text[index]);
      if (index < text2.length) setDisplayText2((prev) => prev + text2[index]);
      index++;

      if (index >= text.length && index >= text2.length) {
        if (typingInterval.current) {
          clearInterval(typingInterval.current);
        }
      }
    }, duration);

    return () => {
      if (typingInterval.current) clearInterval(typingInterval.current);
    };
  }, []);

  return (
    <View style={styles.titleMain}>
      <Text style={styles.title}>{displayText}</Text>
      <Text style={styles.title2}>{displayText2}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  titleMain: {
    flexDirection: "row",
    marginTop: 100,
    textAlign: "center",
    marginLeft: "auto",
  },
  title: {
    fontSize: 180,
    color: "white",
    fontFamily: "Comfortaa_600SemiBold",
  },
  title2: {
    fontSize: 40,
    color: "white",
    fontFamily: "Comfortaa_600SemiBold",
    left: -90,
    marginTop: "auto",
  },
});

export default TypeWriterComponent;
