// set up ======================================================================
var http = require("http");
var express = require("express");
var app = express(); // create our app w/ express
var mongoose = require("mongoose"); // mongoose for mongodb
var cors = require("cors");

var methodOverride = require("method-override");
var bodyParser = require("body-parser");
var path = require("path");

var port = 4000;

// configuration ===============================================================
mongoose.connect(
  "mongodb+srv://hubertkniola:angular123@cluster0.kvdmw.mongodb.net/Cluster0?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
); // connect to mongoDB database on modulus.iox

app.set("port", process.env.PORT || port);
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public"))); // set the static files location /public/img will be /img for users

// define model ================================================================
var Todo = mongoose.model("Todo", {
  text: String,
  done: Boolean,
});

// routes ======================================================================
app.use(cors());

// api ---------------------------------------------------------------------
// get all todos
app.get("/api/todos", function (req, res) {
  // use mongoose to get all todos in the database
  Todo.find(function (err, todos) {
    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
    if (err) res.send(err);

    res.json(todos); // return all todos in JSON format
  });
});

app.get("/api/todos/:todo_id", function (req, res) {
  // use mongoose to get all todos in the database
  Todo.find(
    {
      _id: req.params.todo_id,
    },
    function (err, todos) {
      // if there is an error retrieving, send the error. nothing after res.send(err) will execute
      if (err) res.send(err);

      res.json(todos); // return all todos in JSON format
    }
  );
});

// create todo and send back all todos after creation
app.post("/api/todos", function (req, res) {
  // create a todo, information comes from AJAX request from Angular
  Todo.create(
    {
      text: req.body.text,
      done: false,
    },
    function (err, todo) {
      if (err) res.send(err);

      // get and return all the todos after you create another
      Todo.find(function (err, todos) {
        if (err) res.send(err);
        res.json(todos);
      });
    }
  );
});

// app.put("/api/todos", function (req, res) {});
app.patch("/api/todos/:todo_id", function (req, res) {
  Todo.findByIdAndUpdate(
    req.params.todo_id,
    {
      done: !res.params.done,
    },
    function (err, todo) {
      if (err) res.send(err);

      // get and return all the todos after you update another
      Todo.find(function (err, todos) {
        if (err) res.send(err);
        res.json(todos);
      });
    }
  );
});

// delete a todo
app.delete("/api/todos/:todo_id", function (req, res) {
  Todo.remove(
    {
      _id: req.params.todo_id,
    },
    function (err, todo) {
      if (err) res.send(err);

      // get and return all the todos after you create another
      Todo.find(function (err, todos) {
        if (err) res.send(err);
        res.json(todos);
      });
    }
  );
});

// application -------------------------------------------------------------
app.get("*", function (req, res) {
  res.sendFile("./public/index.html", { root: __dirname });
});

// listen (start app with node server.js) ======================================
var server = http.createServer(app);
server.listen(app.get("port"), function () {
  console.log(
    "Express server listening on: http://localhost:" + app.get("port")
  );
});
