require('dotenv').config();

//import serverless
const serverless = require("serverless-http");

// Import express
let express = require('express')

// Initialize the app
let app = express();

var cors = require('cors');
app.use(cors());

// Import Body parser
let bodyParser = require('body-parser');

// Import Mongoose
let mongoose = require('mongoose');

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
   extended: true
}));

app.use(bodyParser.json());

var uri = process.env.MODE && process.env.MODE === "SERVERLESS" ? "mongodb+srv://cs3219-testuser:i4QjONtOfyJzQmoV@eugeneyl-cluster.lu3m4.mongodb.net/cs3219_addressbook?retryWrites=true&w=majority" : "mongodb://localhost/cs3219_addressbook"

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
app.get('/', (req, res) => res.send('APIs are on /api/contacts. Try it out'));

// Launch app to listen to specified port
app.listen(port, function () {
     console.log("API server running on port " + port);
});

// Import routes
let apiRoutes = require("./api-routes")

// Use Api routes in the App
app.use('/api', apiRoutes)

//For local and testing
module.exports = app
module.exports.handler = serverless(app);
