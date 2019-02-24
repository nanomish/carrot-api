let express = require('express')
let apiRoutes = require("./api-routes")
let bodyParser = require('body-parser');
let mongoose = require('mongoose');

let app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
// Connect to Mongoose and set connection variable
const connection = 'mongodb://carrot:carrot10@ds349065.mlab.com:49065/carrot';
mongoose.connect(connection, {useNewUrlParser: true});
var db = mongoose.connection;


app.get('/', (req, res) => res.send('Hello World with Express'));


// Use Api routes in the App
app.use('/api', apiRoutes)


app.listen(port, function () {
  console.log("Running RestHub on port " + port);
});
