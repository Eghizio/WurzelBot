let mongoose = require("mongoose");

let plantSchema = mongoose.Schema({
  id:{
    type:Number,
    required:true
  },
  name:{
    type:String,
    required:true
  },
  time:{
    type:Number,
    required:true
  },
  crop:{
    type:Number,
    required:true
  },
  sx:{
    type:Number,
    required:true
  },
  sy:{
    type:Number,
    required:true
  },
  level:{
    type:Number,
    required:true
  }
});

let Plant = module.exports = mongoose.model("Plant", plantSchema);
