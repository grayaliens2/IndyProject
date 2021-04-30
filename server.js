const express = require("express");
const mysql = require("mysql");
//const bodyParser = require('body-parser');
//app.use(bodyParser.json());              // Support json encoded bodies
//app.use(bodyParser.urlencoded({ extended: true })); // Support encoded bodies
const axios = require('axios');
const qs = require('query-string');

const app = express();


var UserId = 0;
var TheGameName = "junk";
var friendID = 0;

var bodyParser = require('body-parser'); //Ensure our body-parser tool has been added
app.use(bodyParser.json());              // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3000;
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));
app.use(express.static('./resources'));

const db = mysql.createPool({
  host: "us-cdbr-east-03.cleardb.com",
  user: "b4124ed7cb3c31",
  password: "0459d3f0",
  multipleStatements: true,
  database: "heroku_f2be744910a56fc",
});


app.get('/',function (req, res) {
    res.render('pages/home', {
      my_title: 'Home Page',
      data: ''
    });
});


app.post('/asktest', (req, res) => {
  var art_name = req.body.artname;
  if (typeof art_name !== 'string') return res.status(405).send("Please use a String.");
  else res.status(200).send("success");
  url = "https://www.theaudiodb.com/api/v1/json/1/search.php?s=" + art_name;
  axios.get(url)
  .then((response) =>{
    res.render('pages/home', {
      my_title: 'Home Page',
      data: response.data
    });
  });
});

app.post('/askreviewtest', (req, res) => {
  var artnme = req.body.sname;
  var sql = "SELECT * from reviews where Artist = '"+artnme+"';";
  db.query(sql, function(err, result){
  if(err){
    res.status(400).send("There was an error with the DB");
    console.log('error', err);
    res.redirect("/reviews");
  }
  else{
    res.status(200).send("success");
    res.render('pages/reviews', {
      my_title: 'Reviews Page',
      data: result
    });
  }
});
});




app.post('/ask', (req, res) => {
  var art_name = req.body.artname;
  url = "https://www.theaudiodb.com/api/v1/json/1/search.php?s=" + art_name;
  axios.get(url)
  .then((response) =>{
    res.render('pages/home', {
      my_title: 'Home Page',
      data: response.data
    });
  });
});

app.post('/askreview', (req, res) => {
  var artnme = req.body.sname;
  var sql = "SELECT * from reviews where Artist = '"+artnme+"';";
  db.query(sql, function(err, result){
  if(err){
    console.log('error', err);
    res.redirect("/reviews");
  }
  else{
    res.render('pages/reviews', {
      my_title: 'Reviews Page',
      data: result
    });
  }
});
});





app.get('/reviews', (req, res) =>{
  var sql = "SELECT * from reviews;";
  db.query(sql, function(err, result){
  if(err){
    console.log('error', err);
    res.render('pages/reviews', {
      my_title: 'Reviews Page',
      data: ''
    });
  }
  else{
    res.render('pages/reviews', {
      my_title: 'Reviews Page',
      data: result
    });
  }
});
});


app.post('/rate', (req, res) =>{
  var thename = req.body.aname;
  var des = req.body.description;
  db.query("INSERT INTO `reviews` (Artist, Review) VALUES ('"+thename+"', '"+des+"'); SELECT * from reviews;", function (err, result) {
          if (err){
            console.log('error', err);
            res.redirect("/reviews");
          }
          else{
            res.render('pages/reviews', {
              my_title: 'Reviews Page',
              data: result[1]
            });
          }
        });
});

module.exports = app.listen(3000);
console.log('3000 is the magic port');
