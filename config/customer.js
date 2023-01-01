
var admin = require("firebase-admin");
var customerAccount = require("../customerKey.json");
var billsAccount = require("../nhahangKey.json");
admin.initializeApp({
  credential: admin.credential.cert(customerAccount),
  databaseURL: "https://profile-management-71657-default-rtdb.asia-southeast1.firebasedatabase.app"
},);
admin.initializeApp({
  credential: admin.credential.cert(billsAccount),
  databaseURL: "https://nhahang-5d1b7-default-rtdb.asia-southeast1.firebasedatabase.app",
},"bills");
const db=admin.firestore();
module.exports = db;
