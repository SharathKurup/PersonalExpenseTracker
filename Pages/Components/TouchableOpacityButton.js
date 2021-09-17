import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

function TouchableOpacityButton(props) {
  return (
    <TouchableOpacity style={styles.button} onPress={props.buttonClick}>
      <Text style={styles.text}>{props.text}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#000080", //Navy
    color: "#ffffff",
    padding: 10,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
  },
  text: {
    color: "#ffffff",
  },
});

export default TouchableOpacityButton;
