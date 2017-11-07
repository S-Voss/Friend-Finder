//Require the appropriate packages.
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");

// Sets up the Express App
var app = express();
var PORT = process.env.PORT || 3000; //You HAVE TO add process.env.PORT for heroku to work.!!!

//create the application'x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: true }));
// Sets up the Express app to handle data parsing
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.text({ type: 'text/html' }));
app.use(bodyParser.raw({ type: "application/vnd.custom-type" }));
  
//This points the app to my route files so the server knows how to handle requests from the browser
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

//Start the server and start listening
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});