const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const db = mongoose.connect("mongodb://localhost/bookAPI");
const port = process.env.PORT || 3000;
const Book = require("./models/bookModels");
const bookRouter = require("./routes/bookRouter")(Book)

const MongoClient = require("mongodb").MongoClient;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Welcome to my nodeAPIs")
});

app.use("/api", bookRouter);

app.listen(port, () => {
    console.log("App listening on port " + port)
})