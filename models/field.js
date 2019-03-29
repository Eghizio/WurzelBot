let mongoose = require("mongoose");

let fieldSchema = mongoose.Schema({
  field:{
    type:Number,
    required:true
  },
  plantID:{
    type:Number,
    default:0,
    required:false
  },
  watered:{
    type:Boolean,
    default:false,
    required:false
  },
});

let Field = module.exports = mongoose.model("Field", fieldSchema);

//Get Fields
module.exports.getFields = function(callback, limit){
  Field.find(callback).sort({field:1});
}

//Init Field
module.exports.initField = function(field, callback){
  Field.create({field:field}, callback);
}

//Update Fields
module.exports.updateField = function(id, field, options, callback){
var query = {_id:id};
var update = {
  name: genre.name
};
  Field.findOneAndUpdate(query, update, options, callback);
}

//Delete Genre
module.exports.removeGenre = function(field, callback){
  Field.deleteOne({field:field}, callback);
}
