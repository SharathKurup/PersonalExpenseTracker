import axios from "axios";
//Currently using API calls provided by sheet.best
//Further dev to include calls to Google API for sheets.
const _URL =
  "https://sheet.best/api/sheets/b212c183-2aac-46a9-86e6-6e443c8f3d5b";
function AddExpense(expense) {
  axios.post(_URL, JSON.stringify(expense)).then((response) => {
    console.log(response);
  });
}

const exportList = { AddExpense };

export default exportList;
