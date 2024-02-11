// Create Server App Using NodeJS and Express (EJS)
// Registration form where user will enter his (name , password, email )

// Validate password should be at least 8 characters if less then show “Error
// password is less than 8 characters” else show “Registration success “
// The error message should be displayed in the registration page using EJS
// Part 1

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded());


app.set("view-engine","ejs");

app.get("/" , function(req,res) {
    res.redirect("/register");
});

app.get("/register" , function(req,res) {
    res.render("register.ejs");
});

app.post("/register" , function(req,res) {
    console.log(req.body);
    msg = "" ;
    if (req.body.password.length >= 8 ) {
        msg = "Registration success"
    }
    else {
        msg = "Error password is less than 8 characters"
    }

    res.render("register.ejs", { "msg":msg });
});


console.log("Server is runnig at port 8088");
app.listen("8088");


