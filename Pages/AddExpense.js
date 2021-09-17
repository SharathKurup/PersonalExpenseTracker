import React, { useState } from "react";
import { SafeAreaView, ToastAndroid } from "react-native";
import TextInputComponent from "./Components/TextInputComponent";
import TouchableOpacityButton from "./Components/TouchableOpacityButton";
import DatePickerComponent from "./Components/DatePickerComponent";
import Service from "../Services/Service";

function AddExpense() {
  const [date, setDate] = useState(new Date());
  const [expense, setExpense] = useState();
  const [description, setDescription] = useState();
  const ClearData = () => {
    setDate(new Date());
    setExpense("");
    setDescription("");
  };

  const showSuccessMessage = () => {
    ToastAndroid.show("Expense Saved Successfully.", ToastAndroid.SHORT);
  };

  const CreateExpense = () => {
    Service.CreateExpense(date, expense, description, function (row) {
      if (row > 0) {
        ClearData();
        showSuccessMessage();
      }
    });
  };

  return (
    <SafeAreaView>
      <DatePickerComponent
        testID="dateTimePicker"
        value={date}
        mode="date"
        is24Hour={true}
        display="spinner"
        setDate={setDate}
        Date={date}
      />
      <TextInputComponent
        placeholder="Enter Description"
        keyboardType="default"
        onChangeText={(description) => setDescription(description)}
        value={description}
      />
      <TextInputComponent
        placeholder="Enter Expense"
        keyboardType="decimal-pad"
        onChangeText={(expense) => setExpense(expense)}
        value={expense}
      />

      <TouchableOpacityButton text="Submit" buttonClick={CreateExpense} />
      <TouchableOpacityButton text="Clear" buttonClick={ClearData} />
    </SafeAreaView>
  );
}

export default AddExpense;
