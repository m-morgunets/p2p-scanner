const mysql = require("mysql");
const util = require("util"); 

module.exports = function connectDataBase(dataBaseName) {
  let connection = mysql.createConnection({
    host: process.env.HOST_DB,
    user: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    database: dataBaseName,
  });

  connection.query = util.promisify(connection.query).bind(connection);

  connection.connect(function(err){
    if (err) {
        console.log("error connecting: " + err.stack);
        return;
    };
    console.log("connected as... " + connection.threadId);
  });

  return connection;
}


// let connection = mysql.createConnection({
//   host: process.env.HOST_DB,
//   user: process.env.USER_DB,
//   password: process.env.PASSWORD_DB,
//   database: process.env.NAME_DB,
// });

// connection.query = util.promisify(connection.query).bind(connection);

// connection.connect(function(err){
//   if (err) {
//       console.log("error connecting: " + err.stack);
//       return;
//   };
//   console.log("connected as... " + connection.threadId);
// });

// module.exports = connection;