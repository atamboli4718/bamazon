var mysql = require("mysql");
var inquirer = require("inquirer");

// creates the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "432ograL!",
    database: "bamazon_db"
  });

  connection.connect(function(err) {
    if (err) throw err;
    //if connection is successful, display connection id
    console.log("connected as id " + connection.threadId)
  }); 

  