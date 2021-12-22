import React, { useState } from "react";
import { View, Alert, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Fontisto } from "@expo/vector-icons";
import TextInputComponent from "./TextInputComponent";
//https://github.com/react-native-datetimepicker/datetimepicker
function DatePickerComponent(props) {
  //const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const showDatepicker = () => {
    showMode("date");
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    props.setDate(currentDate);
  };

  return (
    <View>
      <TextInputComponent
        placeholder="Select Date"
        editable={false}
        value={new Date(props.Date).toDateString()}
        style={styles.textInput}
      />
      <Fontisto
        name="date"
        size={24}
        color="black"
        onPress={showDatepicker}
        style={styles.icon}
      />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={props.Date}
          mode={props.mode}
          is24Hour={props.is24Hour}
          display={props.display}
          onChange={onChange}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  textInput: {
    color: "black",
  },
  icon: {
    position: "absolute",
    right: 8,
    top: 12,
  },
});
export default DatePickerComponent;
