// Create Rest web service using NodeJS and Express
// For showing list of cars , get car by id , add and delete car
// Save cars data in js array
// Car will has (model ,license number) properties
// Then create html page to do all the webservice operation with js fetch functions

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(bodyParser.urlencoded());

app.set("view-engine","ejs");

// app.use("/css" , express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));

cars = [
    {id:1, model: "Toyota", licenceNo: "333-042-423"},
    {id:2, model: "Renault", licenceNo: "333-444-555"},
    {id:3, model: "Mercedes", licenceNo: "000-434-855"},
    {id:4, model: "Opel", licenceNo: "674-142-000"},
    {id:5, model: "Ford", licenceNo: "757-244-885"},
]
let latestId = cars[cars.length - 1].id;

app.get("/bootstrap" , function(req,res) {
    res.sendFile(path.join(__dirname, 'node_modules/bootstrap/dist/css/bootstrap.min.css'));
})

app.get("/" , function(req,res) {
    res.redirect("/list");
})

app.get("/list", function(req, res) {
    res.render("index.ejs", {"cars": cars});
});

app.get("/list/:id", function(req, res) {
    let cid = req.params.id;
    let car = cars.find(tcar => tcar.id == cid )    

    if(car != null)
        res.render("car-show.ejs", {"car": car});
    else
        res.render("msg.ejs", {"msg" : "No Car with this id " + cid});
});


app.get("/delete/", function(req, res) {
    let cid = req.query.id;
    let index = cars.findIndex( e => e.id == cid);
    console.log(index);
    if(index >= 0) {
        cars.splice(index, 1);
        res.redirect("/list");
    }
    else {
        res.render("msg.ejs", {"msg" : "No Car with this id " + cid});
    }
});

app.get("/add", function(req, res) {
    res.render("add.ejs");
});

app.post("/add", function(req, res) {
    let model = req.body.model;
    let licenceNo = req.body.licence;

    cars.push({id : ++latestId ,model : model , licenceNo: licenceNo });
    
    res.redirect("/list");
});



console.log("Server is listening at port 8088");
app.listen("8088");