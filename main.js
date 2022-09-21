//packages to be used
const express = require("express")
const nodemon = require("nodemon")
require("dotenv").config()
const bodyParser = require("body-parser")
//creating an instance of http
const app = express()


//registering middleware

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});


//handles error
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.status || 500;
    const message = error.message;
    res.status(status).json({ message: message });
});



app.listen(process.env.PORT || 3000, () => {
    require("./utils/db")
    console.log("App Started")
})