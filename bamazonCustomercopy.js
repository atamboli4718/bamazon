var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

//cli table 
var table = new Table({
  head: ['ID', 'NAME', 'PRICE'],
  colWidths: [8, 12, 8],
  colAligns: ['middle', 'middle', 'middle']
});

// creates the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  // Your password
  password: "432ograL!",
  database: "bamazon_db"
});

connection.connect(function (err) {
  if (err) throw err;
  //if connection is successful, display connection id
  console.log("connected as id " + connection.threadId)
  displayItems();
});

function displayItems() {
  connection.query("SELECT * FROM products", function (err, results) {
    if (err) throw err;
    for (var i = 0; i < results.length; i++) {
      table.push(
        [results[i].item_id,
          results[i].product_name,
          results[i].price
        ])
    }
    console.log(table.toString());
    inquirer
      .prompt([{
        name: "idSelection",
        type: "number",
        message: "what is the id of the item you would like to purchase?"
      }, ]).then(function (idSelection) {
        var chosenItem = idSelection
        console.log(chosenItem);
        howManyFun();
      })
  })
}

function howManyFun() {
  inquirer
    .prompt([{
      name: "quantitySelection",
      type: "number",
      message: "How many would you like to purchase?"
    }, ]).then(function (idSelection) {
      connection.query("SELECT stock_quantity FROM products WHERE item_id = ?", [idSelection],
        function (err, results) {
          if (err) throw err;
          if (idSelection > results) {
            console.log("it's yours!")
          }

        })

    })
}