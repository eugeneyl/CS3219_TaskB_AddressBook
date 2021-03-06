//Depreciated, archive purpose

require('dotenv').config();

// Import express
let express = require('express')

// Initialize the app
let app = express();

// Import Body parser
let bodyParser = require('body-parser');

// Import Mongoose
let mongoose = require('mongoose');

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
   extended: true
}));

app.use(bodyParser.json());

var uri = !process.env.MODE || process.env.MODE === "local" ? process.env.MONGODB_LOCAL : process.env.MONGODB_SERVERLESS

// Connect to Mongoose and set connection variable
mongoose.connect(uri, { useNewUrlParser: true});
var db = mongoose.connection;

// Added check for DB connection
if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

// Setup server port
var port = process.env.PORT || 8080;

// Send message for default URL
app.get('/', (req, res) => res.send('APIs are on /api/contacts'));

// Launch app to listen to specified port
app.listen(port, function () {
     console.log("API server running on port " + port);
});

// Import routes
let apiRoutes = require("./api-routes")

// Use Api routes in the App
app.use('/api', apiRoutes)

module.exports = app;