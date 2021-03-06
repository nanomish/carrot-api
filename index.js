let cors = require('cors');
let express = require('express')
let apiRoutes = require("./api-routes")
let bodyParser = require('body-parser');
let mongoose = require('mongoose');

let app = express();
const port = process.env.PORT || 8080;

app.use('*', cors());
app.use(bodyParser.urlencoded({
  extended: true
}));

/*app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});*/
app.use(bodyParser.json());
// Connect to Mongoose and set connection variable
const connection = 'mongodb://carrot:carrot10@ds349065.mlab.com:49065/carrot';
mongoose.connect(connection, {useNewUrlParser: true})
  .then(() => {
    console.log('Connected to DB successfully!');
  }, (error) => {
  error && console.log('Error connecting to db.', error);
});
var db = mongoose.connection;


app.get('/', (req, res) => res.send('Hello World with Express'));


// Use Api routes in the App
app.use('/api', apiRoutes)


app.listen(port, function () {
  console.log("Running RestHub on port " + port);
});
