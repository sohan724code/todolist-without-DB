const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");


const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {

  const day = date.getDate();
  res.render("list", {
    listTitle: day,
    newListItems: items
  });

});

app.post("/", function(req, res) {
  const item = req.body.newItem;
  if (req.body.list === "Work List") {
    workItems.push(item);
    res.redirect("/work");
    console.log("Everything is fine");
  } else {
    items.push(item);
    res.redirect("/");
    console.log("i got here");
  }

});

app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    newListItems: workItems
  });
});

app.get("/about", function(req, res) {
  res.render("about");
})


app.listen(3000, function() {
  console.log("Server is running on Port 3000");
})