import React, { useEffect } from "react";
import { View, ToastAndroid, Alert } from "react-native";
import TouchableOpacityButton from "./Components/TouchableOpacityButton";
import TextComponent from "./Components/TextComponent";
import Service from "../Services/Service";

function Home({ navigation }) {
  useEffect(() => {
    Service.CreateTable();
  }, []);

  const ResetExpenses = () => {
    Service.DropTable();
    Service.CreateTable();

    ToastAndroid.show("Expense Reset Succesfull.", ToastAndroid.LONG);
  };
  const BackupExpenses = () => {
    Service.DropTable();
    Service.CreateTable();

    ToastAndroid.show("Work In Progress.", ToastAndroid.SHORT);
    Alert.alert("Expense Tracker", "Work In Progress.");
  };
  const GetExpensesTest = () => {
    Service.GetExpensesTest();
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        flexDirection: "column",
      }}
    >
      <TextComponent text="Home Screen" />
      <TouchableOpacityButton
        text="Add Expense"
        buttonClick={() => navigation.navigate("Add Expense")}
      />
      <TouchableOpacityButton
        text="View Expenses"
        buttonClick={() => navigation.navigate("View Expenses")}
      />
      {/* <TouchableOpacityButton
        text="Delete Expense"
        buttonClick={() => navigation.navigate("Delete Expense")}
      /> */}
      <TextComponent text="Admin Tools" />
      <TouchableOpacityButton
        text="Reset Expenses"
        buttonClick={ResetExpenses}
      />
      <TouchableOpacityButton text="Backup" buttonClick={BackupExpenses} />
      {/* <TouchableOpacityButton text="Test Data" buttonClick={GetExpensesTest} /> */}
    </View>
  );
}

export default Home;
