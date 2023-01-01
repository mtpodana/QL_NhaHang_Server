function connected(){
  var sql = require("mssql");

  // config for your database
  var config = {
    user: 'admin',
    password: 'abc123',
    server: 'LAPTOP-CLGEN4RP\\MTP', 
    database: 'Ql_NhaHang',
    port:'1234',
    trustServerCertificate: true
};
// var config = {
//   user: 'Admin',
//   password: 'Abc12345',
//   server: 'mssql-99710-0.cloudclusters.net', 
//   database: 'Ql_NhaHang',
//   port:10103,
//   trustServerCertificate: true
// };

  // connect to your database
  sql.connect(config, function (err) {
  
      if (err) console.log(err);
      else console.log("Connected !");
  });
}

module.exports={connected};

