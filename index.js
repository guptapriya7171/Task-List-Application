const express = require("express");
// const http = require("http");
const path = require("path");
const port = 1111;
const fs = require("fs");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded());
app.use(express.static('assets'));
//middleware 1 
// app.use(function(eq,res, next){
//     console.log("middleware 1 called");
//     next();
// });

var todoList = [
  {
    description: "Why not add a task?",
    category: "Work",
    date: "9-May-2022",
  },
  {
    description: "Let's make a todo app",
    category: "School",
    date: "8-Apr-2022",
  },
  {
    description: "Report Submission deadline",
    category: "School",
    date: "1-Jun-2022",
  },
];
// app.use(express.static('public'))
app.get("/", function (req, res) {
  // res.send('<h1>Cool, it is running or is it</h1>');
  return res.render("index", {
    title: "My Todolist",
    TasksList: todoList,
  });
});

app.post("/addOne", function (req, res) {
  todoList.push({
    description: req.body.description,
    category: req.body.type,
    date: req.body.taskday,
  });
  return res.redirect("/");
});

//for deleting a contact
app.get('/delete-task/', function(req,res){

  //get the query from the url
  let date =req.query.date;
  
  let taskIndex = todoList.findIndex(task => task.date == date);

  if(taskIndex != -1){
    todoList.splice(taskIndex,1);
  }

  return res.redirect('back');
});
// function requireHandler(req, res){
//     console.log(req.url);
//     res.writeHead(200, {'content-type': ' text/html'});

//     fs.readFile('./index.html', function(err,data){

//         if(err){
//             console.log('error', err);
//             return res.end('<h1>Error!</h1>');

//         }
//         return res.end(data);
// });
// res.end('<h1>Gotcha!</h1>');
// }

// const server = http.createServer(requireHandler);
// server.listen(port, function(err){

//     if(err){
//         console.log(err);
//         return;
//     }
//     console.log("Server is up and running on port: ", port);
// });
app.listen(port, function (err) {
  if (err) {
    console.log("Error in running the server", err);
  }

  console.log("Yup! My Express server is running on port:", port);
});
