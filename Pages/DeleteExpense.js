import React, { useState } from "react";
import { SafeAreaView, ToastAndroid } from "react-native";
import TextInputComponent from "./Components/TextInputComponent";
import TouchableOpacityButton from "./Components/TouchableOpacityButton";
import Service from "../Services/Service";

//https://medium.com/async-la/swipe-to-delete-with-reanimated-react-native-gesture-handler-bd7d66085aee
//TODO:: Delete with swipe gesture
function DeleteExpense({ navigation }) {
  const [expenseID, setExpenseID] = useState();

  const showSuccessMessage = () => {
    ToastAndroid.show("Expense Deleted Successfully.", ToastAndroid.SHORT);
  };

  const DeleteExpense = () => {
    Service.DeleteExpense(expenseID, function (row) {
      if (row > 0) {
        showSuccessMessage();
        setExpenseID("");
        navigation.navigate("View Expenses");
      }
    });
  };
  return (
    <SafeAreaView>
      <TextInputComponent
        placeholder="Enter Expense ID"
        keyboardType="numeric"
        onChangeText={(expenseID) => setExpenseID(expenseID)}
        value={expenseID}
      />
      <TouchableOpacityButton text="Delete" buttonClick={DeleteExpense} />
    </SafeAreaView>
  );
}

export default DeleteExpense;
