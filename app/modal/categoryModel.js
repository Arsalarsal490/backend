const mongoose = require('mongoose')
mongoose.pluralize(null)



const FileSchema = mongoose.Schema({
    _id:{type:String,require:true},
    title:{type:String,require:true},
    name:{type:String,require:true},
    type:{type:String,require:true},
})
var categoryModel = mongoose.model('Categories',FileSchema)
module.exports = categoryModel