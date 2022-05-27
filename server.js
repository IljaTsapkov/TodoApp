var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var server = express();
server.set("view engine", "ejs");
server.use(express.static("public"));
server.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect("mongodb://localhost:27017/todolistDB");

const itemSchema = {
  name: String,
};

const Item = mongoose.model("Item", itemSchema);
const item1 = new Item({ name: "This is a placeholder" });
const item2 = new Item({ name: "This is a placeholder" });
const item3 = new Item({ name: "This is a placeholder" });

const d = [item1, item2, item3];

server.get("/", function (req, res) {
  Item.find({}, function (err, f) {
    if (f.length === 0) {
      Item.insertMany(d, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully saved items to database");
        }
      });
      res.redirect("/");
    } else {
      res.render("list", { newListItem: f });
    }
  });
});

server.post("/", function (req, res) {
  i = req.body.task;
  const item = new Item({
    name: i,
  });
  item.save();
  res.redirect("/");
});

server.post("/delete", function (req, res) {
  Item.findByIdAndRemove(req.body.checkbox, function (err) {
    if (!err) {
      console.log("Successfully deleted");
      res.redirect("/");
    }
  });
});

server.listen(3000, function () {
  console.log("listening on port 3000.");
});
