import React from "react";
import { TextInput, View } from "react-native";

function TextInputComponent(props) {
  return (
    <View
      style={{
        marginLeft: 35,
        marginRight: 35,
        marginTop: 10,
        borderColor: "#007FFF",
        borderWidth: 1,
      }}
    >
      <TextInput
        name={props.name}
        placeholder={props.placeholder}
        keyboardType={props.keyboardType}
        style={props.style}
        editable={props.editable}
        value={props.value}
        onChangeText={props.onChangeText}
      />
    </View>
  );
}

export default TextInputComponent;
