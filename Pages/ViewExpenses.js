import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from "react-native";
import Service from "../Services/Service";
import TextComponent from "./Components/TextComponent";

function ViewExpenses({ navigation }) {
  const [appState, setAppState] = useState({
    loading: null,
    data: null,
    isRefresh: false,
  });

  useEffect(() => {
    //Service.GetExpenses(setAppState);
    GetExpenses();
  }, []);

  const GetExpenses = () => {
    Service.GetExpenses(setAppState);
  };

  const showSuccessMessage = () => {
    ToastAndroid.show("Expense Deleted Successfully.", ToastAndroid.SHORT);
  };

  const DeleteExpense = (expenseID) => {
    Alert.alert(
      "Personal Expense Tracker",
      "Are you sure you want to delete this expense?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            Service.DeleteExpense(expenseID, function (row) {
              if (row > 0) {
                showSuccessMessage();
                GetExpenses();
              }
            });
          },
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  const LongDeleteExpense = () => {
    Alert.alert("Expense Tracker", "Long Delete Pressed");
  };

  let listViewItemSeparator = () => {
    return (
      <View
        style={{ height: 0.5, width: "100%", backgroundColor: "#808080" }}
      />
    );
  };
  //TODO:: For long press use Pressable
  //<Pressable onPress={DeleteExpense} onLongPress={LongDeleteExpense}>
  let listItemView = (item) => {
    return (
      <View
        key={item.ExpenseID}
        style={{ backgroundColor: "white", padding: 20 }}
      >
        {/* <Text>Id: {item.ExpenseID}</Text> */}
        <Text>Date: {item.ExpenseDate}</Text>
        <Text>Description: {item.ExpenseDescription}</Text>
        <Text>Amount: {item.ExpenseAmount}</Text>
        <View
          style={[
            styles.container,
            {
              flexDirection: "row",
            },
          ]}
        >
          <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => DeleteExpense(item.ExpenseID)}
          >
            <Text style={styles.text}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (!appState.loading && appState.loading != null) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }} removeClippedSubviews={false}>
            <FlatList
              data={appState.data}
              ItemSeparatorComponent={listViewItemSeparator}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => listItemView(item)}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  } else
    return (
      //TODO::need to check not displaying
      <SafeAreaView>
        <TextComponent Text="No Expense Found." />
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#000080", //Navy
    color: "#ffffff",
    padding: 5,
    marginLeft: 35,
    width: 100,
  },
  text: {
    color: "#ffffff",
  },
  container: {
    flex: 1,
    padding: 20,
  },
});

export default ViewExpenses;
