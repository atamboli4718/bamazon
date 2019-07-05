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
    displayItems();
  }); 

  function displayItems(){
      connection.query("SELECT * FROM products", function(err,results){
          if (err) throw err;
          inquirer.prompt([
              {
                  name: "products available",
                  type: "rawlist",
                  choices: function(){
                      var productOptions;
                      for (var i=0;i>results.length;i++){
                        productOptions.push(results[i].item_id);
                        //productOptions.push(results[i].product_name);
                        //productOptions.push(results[i].price);
                      }
                      return productOptions;
                  },
                  message: "what is the id of the item you would like to purchase?"
              }
          ]).then(function(answer){
              var chosenItem;
              for (var i=0; i<results.length; i++){
                  if (results[i].product_name ===answer.choice) {
                      chosenItem = results[i];
                      console.log('user chose: ' +chosenItem);
                  }
              }

          })
      })
  }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         