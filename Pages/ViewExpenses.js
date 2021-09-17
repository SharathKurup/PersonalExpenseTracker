import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, Text, View, SafeAreaView } from "react-native";
import Service from "../Services/Service";
import TextComponent from "./Components/TextComponent";
function ViewExpenses({ navigation }) {
  const [appState, setAppState] = useState({
    loading: null,
    data: null,
    isRefresh: false,
  });

  useEffect(() => {
    Service.GetExpenses(setAppState);
  }, []);

  let listViewItemSeparator = () => {
    return (
      <View
        style={{ height: 0.5, width: "100%", backgroundColor: "#808080" }}
      />
    );
  };

  let listItemView = (item) => {
    return (
      <View
        key={item.ExpenseID}
        style={{ backgroundColor: "white", padding: 20 }}
      >
        <Text>Id: {item.ExpenseID}</Text>
        <Text>Date: {item.ExpenseDate}</Text>
        <Text>Amount: {item.ExpenseAmount}</Text>
        <Text>Description: {item.ExpenseDescription}</Text>
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

export default ViewExpenses;
