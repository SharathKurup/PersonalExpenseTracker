import * as SQLite from "expo-sqlite";
import { enablePromise } from "react-native-sqlite-storage";
import * as CONSTANT from "./../Constants";
import axios from "axios";

//To use sql lite app eject from expo and configure.
//https://stackoverflow.com/questions/56562472/how-to-fix-undefined-is-not-an-object-evaluating-nativemodulessqlitemeth

function CreateOpenDB() {
  var db = SQLite.openDatabase(
    CONSTANT.DATABASENAME,
    "1.0",
    "DB for Personal Expense Tracker",
    100
  );
  return db;
}

function CreateTable() {
  var db = CreateOpenDB();

  let TbCreateQuery =
    "CREATE TABLE IF NOT EXISTS " +
    CONSTANT.TABLENAME +
    " (ExpenseID INTEGER PRIMARY KEY, ExpenseDate TEXT, ExpenseAmount NUMERIC, ExpenseDescription TEXT, ExpenseCreatedBy TEXT, isBackUp INTEGER)";

  db.transaction(function (txn) {
    txn.executeSql(
      TbCreateQuery,
      null,
      function (tx, res) {
        console.log(tx);
        console.log(res);
        console.log("Create Table Success.");
      },
      function (tx, err) {
        console.log("Create Table Fail.");
      }
    );
  });
}

function DropTable() {
  var db = CreateOpenDB();

  let TbDropQuery = "DROP TABLE IF EXISTS " + CONSTANT.TABLENAME;

  db.transaction(function (txn) {
    txn.executeSql(
      TbDropQuery,
      null,
      function (tx, res) {
        //console.log(res);
        console.log("Drop Table Success.");
      },
      function (tx, err) {
        //console.log(err);
        console.log("Drop Table Fail.");
      }
    );
  });
}

enablePromise(true);
function CreateExpense(
  ExpenseDate,
  ExpenseAmount,
  ExpenseDescription,
  callback
) {
  var db = CreateOpenDB();
  var tmpName = "ADMIN";
  let TbInsertQuery =
    "INSERT INTO " +
    CONSTANT.TABLENAME +
    " (ExpenseDate, ExpenseAmount, ExpenseDescription, ExpenseCreatedBy, isBackUp) VALUES (?,?,?,?,?)";
  db.transaction(function (txn) {
    txn.executeSql(
      TbInsertQuery,
      [ExpenseDate.toString(), ExpenseAmount, ExpenseDescription, tmpName, 0],
      function (tx, res) {
        //console.log("Results ", res.rowsAffected);
        if (res.rowsAffected > 0) {
          console.log("Create Expense Success");
          callback(res.rowsAffected); //TODO::Implement promise to return row(success).
        } else {
          console.log("Create Expense Fail");
        }
      },
      function (tx, err) {
        console.log("Error - " + err);
      }
    );
  });
}

function DeleteExpense(ExpenseID, callback) {
  var db = CreateOpenDB();
  let TbDeleteQuery =
    "DELETE FROM " + CONSTANT.TABLENAME + " WHERE ExpenseID = ?";
  db.transaction(function (txn) {
    txn.executeSql(
      TbDeleteQuery,
      [ExpenseID],
      function (tx, res) {
        //console.log("Results ", res.rowsAffected);
        if (res.rowsAffected > 0) {
          console.log("Delete Success");
          callback(res.rowsAffected); //TODO::Implement promise to return row(success).
        } else {
          console.log("Delete Fail");
        }
      },
      function (tx, err) {
        console.log("Error - " + err);
      }
    );
  });
}

function GetExpenses(setAppState, src) {
  if (src == CONSTANT.GRID) GetExpensesForGRID(setAppState);
  else GetExpensesForBackup(setAppState);
}

function GetExpensesForGRID(setAppState) {
  setAppState({ loading: true });
  var db = CreateOpenDB();
  let TbSelectQuery = "SELECT * FROM " + CONSTANT.TABLENAME;
  db.transaction((tx) => {
    tx.executeSql(TbSelectQuery, [], (tx, results) => {
      var temp = [];
      for (let i = 0; i < results.rows.length; ++i)
        temp.push(results.rows.item(i));
      setAppState({ loading: results.rows.length == 0, data: temp });
    });
  });
}
function GetExpensesForBackup(setAppState) {
  let ArrData = [];
  setAppState({ loading: true });
  var db = CreateOpenDB();
  let TbSelectQuery =
    "SELECT * FROM " + CONSTANT.TABLENAME + " WHERE isBackUp = 0";
  db.transaction((tx) => {
    tx.executeSql(TbSelectQuery, [], (tx, results) => {
      var temp = JSON.stringify(results).replace("_array", "expenses");
      setAppState({ loading: results.rows.length == 0, data: temp });
    });
  });
}

function BackupExpenses(data) {
  //const apiUrl = Const.GetEndPoint() + "/Employee";
  //const apiUrl = "https://localhost:5001/PersonalExpenseTracker/Backup";
  //const apiUrl = "https://127.0.0.1:5001/PersonalExpenseTracker/Backup";
  const apiUrl =
    "https://universalapi.herokuapp.com/PersonalExpenseTracker/Backup";
  const options = {
    method: "POST",
    headers: { "content-type": "application/json" },
    data: data,
    url: apiUrl,
  };
  axios(options);
}

const exportList = {
  CreateTable,
  CreateExpense,
  GetExpenses,
  DropTable,
  DeleteExpense,
  BackupExpenses,
};

export default exportList;
