
var customerAccount = require("../customerKey.json");
var billsAccount = require("../nhahangKey.json");
function initializeCustomer(){
     var admin = require("firebase-admin");
     if(admin.apps.length !==0){
      admin.app().delete();
     }
    return  admin.initializeApp({
      credential: admin.credential.cert(customerAccount),
      databaseURL: "https://profile-management-71657-default-rtdb.asia-southeast1.firebasedatabase.app"
    });
}
function initializeBill(){
    var admin = require("firebase-admin");
    if(admin.apps.length !==0){
      admin.app().delete();
     }
    return admin.initializeApp({
      credential: admin.credential.cert(billsAccount),
      databaseURL: "https://nhahang-5d1b7-default-rtdb.asia-southeast1.firebasedatabase.app",
    });
} 
module.exports = {initializeBill,initializeCustomer};
