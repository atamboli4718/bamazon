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
  //console.log("connected as id " + connection.threadId)
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
        console.log("id selection: "+ idSelection.idSelection);
        howManyFun(idSelection);
      })
  })
}

function howManyFun(id) {
  inquirer
    .prompt([{
      name: "quantitySelection",
      type: "number",
      message: "How many would you like to purchase?"
    }, ]).then(function (quantitySelection) {
      //console.log(id);
      connection.query("SELECT stock_quantity, price FROM products WHERE item_id = ?", [id.idSelection],
        function (err, res) {
          if (err) throw err;
          //console.log("id selection: " + id.idSelection);
          //console.log(typeof(quantitySelection.quantitySelection));
          //console.log(typeof(res[0]));
          //console.log(res[0]);
          //console.log(res[0].stock_quantity);
          //console.log(res[0].price);
          if (quantitySelection.quantitySelection <= res[0].stock_quantity) {
            var newQuantity = (res[0].stock_quantity)-(quantitySelection.quantitySelection);
            var totalCost = (quantitySelection.quantitySelection)*(res[0].price);
            console.log("it's yours! You're total cost is $"+ totalCost);
            //console.log(id.idSelection);
            reduceQuantity(newQuantity,id.idSelection);
          } else {
            console.log("We don't have that many, please choose another item.");
            displayItems();
          }
        })
    })
}

function reduceQuantity(quantity,id){
  console.log("new quantity is: "+quantity);
  console.log("for id: "+id);
  connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?",[quantity,id], function (err, results) {
    if (err) throw err;
    displayItems();
  })
}