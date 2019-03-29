const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config/database")

//MongoDB
mongoose.connect(config.database, { useNewUrlParser: true });
let db = mongoose.connection;
//wurzel collection "fields"
let Fields = require("./models/field");


db.once("open", function(){
  console.log("Connected to 'wurzel' MongoDB");
  //Checks if fields collection exist, else initializes it
  Fields.getFields(function(err, fields){

    if(err) throw err;
    Fields.countDocuments(function(err, count){

      if(err) throw err;
      else if(count===0){
        
        console.log("Missing 'fields' collection. Initializing...");
        for(var field=1; field<=204; field++){
          Fields.initField(field, function(err, field){
            if(err) throw err;
          });
        }
        console.log("Collection 'fields' initialized...");
      }
      else console.log("Collection 'fields' is ready...");
    });
  });
});

Fields.getFields(function(err, fields){
  if(err) throw err;
  //console.log(fields); //returns array of field objects
});

db.on("error",function(err){
  console.log(err);
});

const app = express();

//Load View Engine: Pug(Jade)
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
//Body Parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname,"public")));

app.get("/",function(req, res){
      res.render("index");
});



//Start Server
app.listen(3000,function(){
  console.log("Server start on port 3000... "+Date());
});
